// src/components/Blaze.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import BlazeChat from "./BlazeChat";
import BlazeZap from "./BlazeZap";

export default function Blaze() {
  const [open, setOpen] = useState(false);
  const [zapDone, setZapDone] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {!zapDone && <BlazeZap onComplete={() => setZapDone(true)} />}

      {zapDone && (
        <>
          {open && <BlazeChat />}
          <motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
  onClick={() => setOpen(!open)}
  className="w-14 h-14 rounded-full text-white flex items-center justify-center shadow-xl border border-gray-600"
  style={{ backgroundColor: "#915EFF" }}
>
  ⚡
</motion.button>
        </>
      )}
    </div>
  );
}
