import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  meta,
  starbucks,
  tesla,
  shopify,
  carrent,
  jobit,
  tripguide,
  threejs,
  brane,
  Cloud1,
  CBIT,
  FSU,
  AIASSoC,
  illa,
  AIS,
  MISD,
  mcphf,
  starter,
  github,
  neurobud_demo,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "tech",
    title: "Tech",
  },
  {
    id: "projects",
    title: "Projects",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "AI Engineer",
    icon: web,
  },
  {
    title: "LLM Architect",
    icon: mobile,
  },
  {
    title: "Agentic Systems",
    icon: backend,
  },
  {
    title: "Full Stack Developer",
    icon: creator,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
];

const experiences = [
  {
    title: "M.S in Information Technology",
    company_name: "Florida State University",
    icon: FSU,
    iconBg: "#E6DEDD",
    date: "January 2024 - May 2025",
    points: [
      "Specializing in Machine Learning and Natural Language Processing.",
      "Focusing on Information System Management and Database Systems.",
      "Researching Agentic AI workflows and Large Language Model applications.",
    ],
  },
  {
    title: "B.E in Electrical and Electronics Engineering",
    company_name: "Chaitanya Bharathi Institute of Technology",
    icon: CBIT,
    iconBg: "#383E56",
    date: "August 2019 - May 2023",
    points: [
      "Acquired skills in electrical circuit analysis and design.",
      "Programming in MATLAB, Python, and C.",
      "Published paper in an International Journal on Power system fault detection and classification using machine learning.",
      "Organized events in annual technical fest.",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Nishanth proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Nishanth does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Nishanth optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "Neurobud",
    description:
      "A cutting-edge BCI project analyzing EEG waves in real-time to detect user focus and stress levels. Features a dashboard for visualizing brain activity.",
    tags: [
      {
        name: "python",
        color: "blue-text-gradient",
      },
      {
        name: "machine-learning",
        color: "green-text-gradient",
      },
      {
        name: "react",
        color: "pink-text-gradient",
      },
    ],
    image: neurobud_demo,
    source_code_link: "https://github.com/nishanth1104/Neurobud",
  },
  {
    name: "MoR Swarm Agents",
    description:
      "A multi-agent system leveraging Mixture of Reasoning (MoR) to solve complex tasks through collaborative AI agents.",
    tags: [
      {
        name: "python",
        color: "blue-text-gradient",
      },
      {
        name: "langchain",
        color: "green-text-gradient",
      },
      {
        name: "multi-agent",
        color: "pink-text-gradient",
      },
    ],
    image: tripguide, // Placeholder
    source_code_link: "https://github.com/nishanth1104/MoR-Swarm",
  },
  {
    name: "Misinformation Detection",
    description:
      "An NLP-based system designed to detect and flag misinformation in news articles using advanced transformer models.",
    tags: [
      {
        name: "nlp",
        color: "blue-text-gradient",
      },
      {
        name: "transformers",
        color: "green-text-gradient",
      },
      {
        name: "python",
        color: "pink-text-gradient",
      },
    ],
    image: carrent, // Placeholder
    source_code_link: "https://github.com/nishanth1104/Misinfo-Detection",
  },
];

const certificatesAndAwards = [
  {
    title: "AI Associate Certification",
    description:
      "Achieved for demonstrating expertise in AI fundamentals, CRM integration, ethical AI practices, and data-driven solutions.",
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7279911497479200768/",
    icon: AIASSoC,
  },
  {
    title: "Salesforce AI Specialist Certification",
    description: "Earned for showcasing advanced skills in Salesforce AI, including the Einstein Trust Layer, Generative AI in CRM, Prompt Builder, Agentforce, and Model Builder.",
    link: "https://www.linkedin.com/posts/nishanth-ayyalasomayajula_salesforceai-aispecialist-artificialintelligence-activity-7284666524378787840-_Rd0?utm_source=share&utm_medium=member_desktop",
    icon: AIS,
  },
  {
    title: "HuggingFace MCP Certification",
    description: "Fundamentals of Model Context Protocol.",
    link: "https://raw.githubusercontent.com/nishanth1104/Personal-website/refs/heads/master/mcphf.webp",
    icon: mcphf,
  },
];

const educations = [
  {
    title: "M.S in Information Technology",
    company_name: "Florida State University",
    icon: FSU,
    iconBg: "#E6DEDD",
    date: "January 2024 - May 2025",
    points: [
      "Machine Learning/Natural language Processing",
      "Information System Management",
      "Database management systems",
    ],
  },
  {
    title: "B.E in Electrical and Electronics Engineering",
    company_name: "Chaitanya Bharathi Institute of Technology",
    icon: CBIT,
    iconBg: "#383E56",
    date: "August 2019 - May 2023",
    points: [
      "Acquired skills in electrical circuit analysis and design and programming languages like MATLAB,Python,C etc. ",
      "Published paper in an International Journal on Power system fault detection and classification using machine learning.",
      "Participated and Organized events in annual technical fest.",
    ],
  },
];

export { services, technologies, experiences, testimonials, projects, certificatesAndAwards, educations };