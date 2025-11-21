import React, { createContext, useContext, useState, useEffect } from 'react';

const TourContext = createContext();

export const useTour = () => useContext(TourContext);

export const TourProvider = ({ children }) => {
  const [isTourActive, setIsTourActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [botTarget, setBotTarget] = useState(null);

  const steps = [
    { target: null, message: "Hi! I'm your AI Assistant. I'll guide you through Nishanth's portfolio. Ready?" },
    { target: "about", message: "Here is a quick overview of Nishanth's background and expertise." },
    { target: "work", message: "Check out his professional journey and work experience." },
    { target: "tech", message: "These are the technologies and tools he works with." },
    { target: "projects", message: "Here are some of the cool projects he has built, including Neurobud!" },
    { target: "contact", message: "Want to collaborate? Send him a message here!" },
  ];

  const startTour = () => {
    setIsTourActive(true);
    setCurrentStep(0);
  };

  const endTour = () => {
    setIsTourActive(false);
    setBotTarget(null);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      endTour();
    }
  };

  useEffect(() => {
    if (isTourActive) {
      const step = steps[currentStep];
      if (step.target) {
        const element = document.getElementById(step.target);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          const rect = element.getBoundingClientRect();
          setBotTarget({ x: rect.left + rect.width / 2, y: rect.top + window.scrollY });
        }
      } else {
        setBotTarget(null); // Center or default position
      }
    }
  }, [isTourActive, currentStep]);

  return (
    <TourContext.Provider value={{ isTourActive, currentStep, startTour, endTour, nextStep, botTarget, steps }}>
      {children}
      {isTourActive && <TourOverlay step={currentStep} steps={steps} onNext={nextStep} onClose={endTour} />}
    </TourContext.Provider>
  );
};

const TourOverlay = ({ step, steps, onNext, onClose }) => {
  return (
    <div className="fixed bottom-10 right-10 z-50 max-w-xs">
      <div className="bg-black-100/90 backdrop-blur-md p-6 rounded-xl border border-neon-blue shadow-[0_0_20px_rgba(0,243,255,0.3)]">
        <h3 className="text-lg font-bold text-neon-purple mb-2">AI Guide</h3>
        <p className="text-white mb-4 text-sm">{steps[step].message}</p>
        <div className="flex justify-between items-center">
          <button onClick={onClose} className="text-secondary text-xs hover:text-white">End Tour</button>
          <button onClick={onNext} className="bg-neon-blue text-black font-bold py-1 px-4 rounded-lg hover:bg-white transition-colors text-sm">
            {step === steps.length - 1 ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};
