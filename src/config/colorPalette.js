export const COLORS = {
  // Primary Colors - Light & Professional
  skyBlue: '#60A5FA',        // Soft blue for accents
  oceanBlue: '#3B82F6',      // Rich blue for primary
  mintGreen: '#34D399',      // Fresh green for success
  lavender: '#A78BFA',       // Soft purple for variety
  coral: '#F87171',          // Warm coral for energy

  // Backgrounds - Light & Clean
  white: '#FFFFFF',
  lightGray: '#F9FAFB',
  softGray: '#F3F4F6',
  cloudWhite: '#FAFAFA',

  // Text Colors - Dark on Light
  textPrimary: '#1F2937',
  textSecondary: '#4B5563',
  textMuted: '#9CA3AF',

  // Gradients
  gradientBlue: 'linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)',
  gradientMint: 'linear-gradient(135deg, #34D399 0%, #10B981 100%)',
  gradientSunset: 'linear-gradient(135deg, #F87171 0%, #FB923C 100%)',

  // Glow effects (subtle)
  blueGlow: '#60A5FA33',
  mintGlow: '#34D39933',

  // Category Colors for Technology
  categories: {
    frontend: '#60A5FA',     // Sky blue
    backend: '#34D399',      // Mint green
    database: '#A78BFA',     // Lavender
    devops: '#F87171',       // Coral
    language: '#3B82F6',     // Ocean blue
    tools: '#8B5CF6',        // Purple
  }
};

// Helper function to get category color
export const getCategoryColor = (techName) => {
  const categoryMap = {
    'HTML 5': 'frontend',
    'CSS 3': 'frontend',
    'JavaScript': 'language',
    'TypeScript': 'language',
    'React JS': 'frontend',
    'Redux Toolkit': 'frontend',
    'Tailwind CSS': 'frontend',
    'Node JS': 'backend',
    'MongoDB': 'database',
    'Three JS': 'frontend',
    'git': 'devops',
    'figma': 'tools',
    'docker': 'devops',
  };

  const category = categoryMap[techName] || 'frontend';
  return COLORS.categories[category];
};
