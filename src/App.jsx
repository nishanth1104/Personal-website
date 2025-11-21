import React, { useState, useEffect } from 'react';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import Navigation from './components/Navigation';
import ScrollProgress from './components/ScrollProgress';
import Phase1DataNucleus from './components/phases/Phase1DataNucleus';
import Phase2ModelAwakening from './components/phases/Phase2ModelAwakening';
import Phase3AgentArchitecture from './components/phases/Phase3AgentArchitecture';
import Phase4EcosystemIntegration from './components/phases/Phase4EcosystemIntegration';
import Phase5AutonomousMultiverse from './components/phases/Phase5AutonomousMultiverse';
import useScrollPhase from './hooks/useScrollPhase';
import { projects } from './constants';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { currentPhase } = useScrollPhase();

  const handlePreloaderComplete = () => {
    setIsLoading(false);
  };

  const handlePhaseClick = (phaseNumber) => {
    // Scroll to phase section
    const section = document.getElementById(`phase${phaseNumber}`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      
      {!isLoading && (
        <>
          <CustomCursor />
          <ScrollProgress />
          <Navigation currentPhase={currentPhase} onPhaseClick={handlePhaseClick} />

          <main>
            <Phase1DataNucleus />
            
            <Phase2ModelAwakening projects={projects} />


            <Phase3AgentArchitecture />


            <Phase4EcosystemIntegration />

            <Phase5AutonomousMultiverse />
          </main>
        </>
      )}
    </>
  );
}

export default App;
