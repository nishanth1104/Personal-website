export const ANIMATION_CONFIG = {
  // Scroll Configuration
  scrollScrub: 1.5,              // GSAP scrub smoothness
  lenisSmooth: 1.2,              // Lenis duration (already configured in main.jsx)

  // 3D Scene Configuration
  particleCount: 3000,           // Phase 1 particles (desktop)
  particleCountMobile: 1000,     // Phase 1 particles (mobile)
  networkNodes: 24,              // Phase 3 neural network nodes
  networkNodesMobile: 12,        // Phase 3 nodes (mobile)

  // Phase Durations (as fraction of scroll range)
  durations: {
    particleConvergence: 0.15,   // Phase 1
    sphereFormation: 0.05,
    explosion: 0.03,             // Phase 2
    gridFormation: 0.08,
    cubeRotation: 0.04,
    networkAssembly: 0.15,       // Phase 3
    dataFlow: 0.05,
    infrastructureAppear: 0.10,  // Phase 4
    containerization: 0.08,
    deployment: 0.10,            // Phase 5
    metricsReveal: 0.10,         // Phase 6
  },

  // Easing Functions (GSAP)
  easings: {
    smooth: 'power2.inOut',
    snap: 'back.out(1.7)',
    bounce: 'elastic.out(1, 0.5)',
    fastIn: 'power2.in',
    slowOut: 'power2.out',
  },

  // Camera Configuration
  camera: {
    fov: 50,
    near: 0.1,
    far: 1000,
    initialPosition: [0, 0, 8],
  },

  // Lighting Configuration
  lights: {
    ambient: 0.2,
    directional: 1,
    point: {
      intensity: 0.5,
      distance: 20,
    }
  },

  // Post-processing
  postprocessing: {
    bloom: {
      intensity: 0.5,
      luminanceThreshold: 0.2,
      luminanceSmoothing: 0.9,
    },
    chromaticAberration: {
      offset: [0.001, 0.001],
    }
  },

  // Performance Thresholds
  performance: {
    mobileMaxWidth: 768,
    tabletMaxWidth: 1024,
    targetFPS: 60,
  },

  // Document Height (for scrolling)
  documentHeight: '600vh',
};

// Responsive configuration helper
export const getResponsiveConfig = (windowWidth) => {
  const isMobile = windowWidth < ANIMATION_CONFIG.performance.mobileMaxWidth;
  const isTablet = windowWidth >= ANIMATION_CONFIG.performance.mobileMaxWidth &&
                   windowWidth < ANIMATION_CONFIG.performance.tabletMaxWidth;

  return {
    particleCount: isMobile ? ANIMATION_CONFIG.particleCountMobile :
                   isTablet ? 2000 : ANIMATION_CONFIG.particleCount,
    networkNodes: isMobile ? ANIMATION_CONFIG.networkNodesMobile :
                  isTablet ? 18 : ANIMATION_CONFIG.networkNodes,
    enablePostProcessing: !isMobile,
    enableFullEffects: !isMobile && !isTablet,
  };
};
