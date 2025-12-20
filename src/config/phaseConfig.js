export const PHASE_CONFIG = {
  PHASE_1: {
    name: 'Data Nucleus',
    scrollStart: 0,
    scrollEnd: 0.15,
    cameraPosition: [0, 0, 8],
    cameraTarget: [0, 0, 0],
    description: 'Raw data converging into intelligent patterns',
  },
  PHASE_2: {
    name: 'Component Disassembly',
    scrollStart: 0.15,
    scrollEnd: 0.30,
    cameraPosition: [0, 3, 10],
    cameraTarget: [0, 0, 0],
    description: 'Breaking down ML components and architectures',
  },
  PHASE_3: {
    name: 'Neural Network',
    scrollStart: 0.30,
    scrollEnd: 0.50,
    cameraPosition: [-5, 5, 12],
    cameraTarget: [0, 0, 0],
    description: 'Assembling interconnected AI systems',
  },
  PHASE_4: {
    name: 'Production Infrastructure',
    scrollStart: 0.50,
    scrollEnd: 0.70,
    cameraPosition: [0, 8, 15],
    cameraTarget: [0, 0, 0],
    description: 'Deploying scalable AI infrastructure',
  },
  PHASE_5: {
    name: 'Deployed AI Platform',
    scrollStart: 0.70,
    scrollEnd: 0.85,
    cameraPosition: [0, 2, 20],
    cameraTarget: [0, 0, 0],
    description: 'Living AI system in production',
  },
  PHASE_6: {
    name: 'Metrics Dashboard',
    scrollStart: 0.85,
    scrollEnd: 1.0,
    cameraPosition: [0, 0, 12],
    cameraTarget: [0, 0, 0],
    description: 'Measuring impact and performance',
  },
};

export const getPhaseFromScroll = (scrollPercent) => {
  for (const [key, phase] of Object.entries(PHASE_CONFIG)) {
    if (scrollPercent >= phase.scrollStart && scrollPercent < phase.scrollEnd) {
      return { key, ...phase };
    }
  }
  // Return last phase if at 100%
  return { key: 'PHASE_6', ...PHASE_CONFIG.PHASE_6 };
};

export const getPhaseProgress = (scrollPercent, phase) => {
  if (!phase) return 0;
  const phaseRange = phase.scrollEnd - phase.scrollStart;
  const progressInPhase = scrollPercent - phase.scrollStart;
  return Math.max(0, Math.min(1, progressInPhase / phaseRange));
};
