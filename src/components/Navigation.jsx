import React from 'react';

const phases = [
  { id: 1, name: 'Data Nucleus' },
  { id: 2, name: 'Model Awakening' },
  { id: 3, name: 'Agent Architecture' },
  { id: 4, name: 'Ecosystem Integration' },
  { id: 5, name: 'Autonomous Multiverse' }
];

const Navigation = ({ currentPhase, onPhaseClick }) => {
  return (
    <nav className="navigation">
      {phases.map((phase) => (
        <button
          key={phase.id}
          className={`nav-item ${currentPhase === phase.id ? 'active' : ''}`}
          data-phase={phase.name}
          onClick={() => onPhaseClick(phase.id)}
          aria-label={`Navigate to ${phase.name}`}
        />
      ))}
    </nav>
  );
};

export default Navigation;
