import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import MainScene from './components/scenes/MainScene';
import LoadingScreen from './components/ui/LoadingScreen';
import PhaseIndicator from './components/ui/PhaseIndicator';
import ScrollHint from './components/ui/ScrollHint';
import ScrollProgress from './components/ScrollProgress';
import CustomCursor from './components/CustomCursor';

import HeroOverlay from './components/overlays/HeroOverlay';
import SkillsOverlay from './components/overlays/SkillsOverlay';
import ProjectsOverlay from './components/overlays/ProjectsOverlay';
import ExperienceOverlay from './components/overlays/ExperienceOverlay';
import EducationOverlay from './components/overlays/EducationOverlay';
import ContactOverlay from './components/overlays/ContactOverlay';

import { useScrollProgress } from './hooks/useScrollProgress';
import { usePhaseTransition } from './hooks/usePhaseTransition';
import { ANIMATION_CONFIG } from './config/animationConfig';

import './App.css';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [showContent, setShowContent] = useState(false);
  const { scrollPercent } = useScrollProgress();
  const { currentPhase } = usePhaseTransition(scrollPercent);

  const handleLoadingComplete = () => {
    console.log('Loading complete, showing content');
    setShowContent(true);
  };

  console.log('App render - showContent:', showContent, 'scrollPercent:', scrollPercent);

  // Set document height for scrolling
  useEffect(() => {
    document.body.style.height = ANIMATION_CONFIG.documentHeight;

    return () => {
      document.body.style.height = 'auto';
    };
  }, []);

  // Setup scroll animations
  useEffect(() => {
    if (!showContent) return;

    // Fade in animations for overlay elements
    gsap.utils.toArray('.fade-in').forEach((elem) => {
      gsap.fromTo(elem,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: elem,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    });

    // Progress bar animation
    gsap.to('.progress-bar', {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [showContent]);

  return (
    <div className="app">
      {/* Loading Screen */}
      <LoadingScreen onComplete={handleLoadingComplete} />

      {/* 3D Scene (Fixed) */}
      {showContent && (
        <>
          <div className="scene-container">
            <MainScene />
          </div>

          {/* UI Overlays (Scroll-based) */}
          <div className="overlay-container">
            {/* Phase 1: Complete System (0-15%) */}
            <HeroOverlay
              visible={scrollPercent < 15}
              progress={scrollPercent < 15 ? scrollPercent / 15 : 1}
            />

            {/* Phase 2-3: Disassembly & Showcase (15-55%) */}
            <SkillsOverlay
              visible={scrollPercent >= 15 && scrollPercent < 55}
              progress={scrollPercent >= 15 ? (scrollPercent - 15) / 40 : 0}
            />

            {/* Phase 4: Reassembly (55-70%) */}
            <ProjectsOverlay
              visible={scrollPercent >= 55 && scrollPercent < 70}
              progress={scrollPercent >= 55 ? (scrollPercent - 55) / 15 : 0}
            />

            {/* Phase 5: Building (70-85%) */}
            <ExperienceOverlay
              visible={scrollPercent >= 70 && scrollPercent < 85}
              progress={scrollPercent >= 70 ? (scrollPercent - 70) / 15 : 0}
            />

            {/* Phase 6: Final + Metrics (85-100%) */}
            <EducationOverlay
              visible={scrollPercent >= 85}
              progress={scrollPercent >= 85 ? (scrollPercent - 85) / 15 : 0}
            />

            <ContactOverlay
              visible={scrollPercent >= 85}
              progress={scrollPercent >= 85 ? (scrollPercent - 85) / 15 : 0}
            />
          </div>

          {/* UI Components */}
          <PhaseIndicator currentPhase={currentPhase} scrollPercent={scrollPercent} />
          <ScrollHint visible={scrollPercent < 0.02} />
          <CustomCursor />
          <ScrollProgress />
        </>
      )}
    </div>
  );
}
