// src/components/BlazeZap.jsx
import { useEffect, useRef, useState } from "react";

export default function BlazeZap({ onComplete }) {
  const canvasRef = useRef(null);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.shadowBlur = 25;
    ctx.shadowColor = "#915EFF";

    function drawBolt(x1, y1, x2, y2, branch = 0) {
      let points = [{ x: x1, y: y1 }, { x: x2, y: y2 }];

      // Recursive subdivision for jagged effect
      for (let i = 0; i < 5; i++) {
        const newPoints = [];
        for (let j = 0; j < points.length - 1; j++) {
          let start = points[j];
          let end = points[j + 1];
          let midX = (start.x + end.x) / 2;
          let midY = (start.y + end.y) / 2;

          midX += (Math.random() - 0.5) * 80 / (branch + 1);
          midY += (Math.random() - 0.5) * 80 / (branch + 1);

          newPoints.push(start, { x: midX, y: midY });
        }
        newPoints.push(points[points.length - 1]);
        points = newPoints;
      }

      // Draw main bolt
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.strokeStyle = `rgba(145, 94, 255, ${Math.random() * 0.5 + 0.5})`;
      ctx.lineWidth = branch === 0 ? Math.random() * 2 + 2 : Math.random() + 1;
      ctx.stroke();

      // Add side branches
      if (branch === 0) { // only main bolt generates side branches
        const numBranches = Math.floor(Math.random() * 3) + 1; // 1-3 side branches
        for (let b = 0; b < numBranches; b++) {
          const branchStart = points[Math.floor(Math.random() * (points.length - 2)) + 1];
          const branchX = branchStart.x + (Math.random() - 0.5) * 150;
          const branchY = branchStart.y + (Math.random() - 0.5) * 150;
          drawBolt(branchStart.x, branchStart.y, branchX, branchY, branch + 1);
        }
      }

      // Recursive sub-branches from existing branches
      if (branch > 0 && branch < 2 && Math.random() < 0.6) {
        const branchStart = points[Math.floor(Math.random() * (points.length - 2)) + 1];
        const branchX = branchStart.x + (Math.random() - 0.5) * 100;
        const branchY = branchStart.y + (Math.random() - 0.5) * 100;
        drawBolt(branchStart.x, branchStart.y, branchX, branchY, branch + 1);
      }
    }

    function lightningStrike() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBolt(0, 0, canvas.width - 60, canvas.height - 60);
    }

    let strikes = 0;
    const interval = setInterval(() => {
      lightningStrike();
      strikes++;

      // Screen flash
      const flash = document.createElement("div");
      flash.style.position = "fixed";
      flash.style.inset = "0";
      flash.style.background = "rgba(145, 94, 255, 0.2)";
      flash.style.zIndex = 200;
      document.body.appendChild(flash);
      setTimeout(() => document.body.removeChild(flash), 80);

      if (strikes > 2) {
        clearInterval(interval);
        setTimeout(() => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          setShow(false);
          onComplete();
        }, 400);
      }
    }, 400);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (!show) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[100]"
    />
  );
}
