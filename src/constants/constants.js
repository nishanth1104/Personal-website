import { Cloud } from "@react-three/drei";
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
      id: "contact",
      title: "Contact",
    },
  ];
  
  const services = [
    {
      title: "LLM Engineer",
      icon: web,
    },
    {
      title: "Front-end Developer",
      icon: mobile,
    },
    {
      title: "UI/UX Designer",
      icon: backend,
    },
    {
      title: "Data Analyst",
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
      name: "React JS",
      icon: reactjs,
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
  ];
  
  const experiences = [
    {
      title: "Associate Process Leader Trainee",
      company_name: "Brane Enterprises Pvt.Ltd",
      icon: brane,
      iconBg: "#383E56",
      date: "January 2023 - November 2023",
      points: [
        "Trained and fine-tuned advanced Voice AI models for sentiment recognition using transformer architectures, increasing model accuracy by 37% over 4 months.",
        "Led the end-to-end development of an inventory management system for Arlec (Australia), integrating SQL databases with ML-driven demand forecasting, which reduced manual effort and costs by 28%.",
        "Deployed production-ready AI models using Docker and Kubernetes, significantly reducing API response latency by 25% and improving system scalability and reliability.",
      ],
    },
    {
      title: "Data Analytics Intern",
      company_name: "Brane Enterprises Pvt.Ltd(Former NSLHUB)",
      icon: brane,
      iconBg: "#383E56",
      date: "October 2022 - January 2023",
      points: [
        "Built end-to-end analytics dashboards using Power BI and Matplotlib to visualize operational KPIs and client metrics.",
        "Designed ERD models and data workflows for internal business applications, streamlining backend development.",
        "Assisted in prototyping machine learning models for predictive maintenance and early trend detection using Python.",
      ],
    },
    {
      title: "Figma Designer (Intern)",
      company_name: "XcitEducation Worldwide",
      icon: figma,
      iconBg: "#E6DEDD",
      date: "Feburary 2021 - June 2022",
      points: [
        "Designed responsive web UI prototypes and user flows tailored for 2,000+ underserved rural students, focusing on usability and accessibility to enhance digital learning outcomes.",
        "Conducted extensive user research and low-bandwidth usability testing, iteratively refining designs to optimize performance and interaction for limited connectivity environments.",
        "Collaborated closely with frontend developers to translate designs into high-quality React and TypeScript components, reducing UI bugs by 30% and accelerating the development lifecycle.",
      ],
    },
    {
      title: "Google Cloud Facilitator (Intern)",
      company_name: "Google",
      icon: Cloud1,
      iconBg: "#383E56",
      date: "April 2020 - August 2020",
      points: [
        "Attained proficiency in Google Cloud Platform (GCP) services, focusing on cloud computing, data storage, and analytics.",
        "Underwent comprehensive GCP training, applied expertise in cloud and information security, and developed efficient data pipelines.",
        "Demonstrated proficiency in GCP, contributing to secure cloud solutions and showcasing expertise in data processing workflows.",
      ],
    },
  ];
  
  const testimonials = [
    {
      testimonial:
        "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
      name: "Sara Lee",
      designation: "CFO",
      company: "Acme Co",
      image: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      testimonial:
        "I've never met a web developer who truly cares about their clients' success like Rick does.",
      name: "Chris Brown",
      designation: "COO",
      company: "DEF Corp",
      image: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
      testimonial:
        "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
      name: "Lisa Wang",
      designation: "CTO",
      company: "456 Enterprises",
      image: "https://randomuser.me/api/portraits/women/6.jpg",
    },
    {
      testimonial:
        "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
      name: "Sara Lee",
      designation: "CFO",
      company: "Acme Co",
      image: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      testimonial:
        "I've never met a web developer who truly cares about their clients' success like Rick does.",
      name: "Chris Brown",
      designation: "COO",
      company: "DEF Corp",
      image: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
      testimonial:
        "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
      name: "Lisa Wang",
      designation: "CTO",
      company: "456 Enterprises",
      image: "https://randomuser.me/api/portraits/women/6.jpg",
    },
  ];
  
  const projects = [
    {
      name: "Power System fault detection and classification using machine learning",
      description:
        "Project based on using machine learning to detect and classify faults in power systems. It involves a MATLAB simulation to identify anomalies, enhancing accuracy and reliability in fault detection.",
      tags: [
        {
          name: "MATLAB",
          color: "blue-text-gradient",
        },
        {
          name: "machine learning",
          color: "green-text-gradient",
        },
        {
          name: "python",
          color: "pink-text-gradient",
        },
      ],
      image: jobit,
      source_code_link: "https://github.com/nishanth1104/Final_Project",
    },
    {
      name: "Travel Companion",
      description:
        "A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.",
      tags: [
        {
          name: "restapi",
          color: "blue-text-gradient",
        },
        {
          name: "react",
          color: "green-text-gradient",
        },
        {
          name: "css",
          color: "pink-text-gradient",
        },
      ],
      image: tripguide,
      source_code_link: "https://github.com/nishanth1104/Travel-Companion",
    },
    {
      name: "ILLA",
      description:
        "Intelligent language learning assistant",
      tags: [
        {
          name: "NLP",
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
      image: illa,
      source_code_link: "https://github.com/nishanth1104/Intelligent-language-learning-assistant",
    },
    {
      name: "Misinformation Detection in Healthcare",
      description:
        " Developed an Agentic AI model that detects false or misleading health claims using NLP and machine learning.",
      tags: [
        {
          name: "NLP",
          color: "blue-text-gradient",
        },
        {
          name: "AI/ML",
          color: "green-text-gradient",
        },
        {
          name: "LLM/Agentic AI",
          color: "pink-text-gradient",
        },
      ],
      image: MISD,
      source_code_link: "https://github.com/nishanth1104/Misinformation-in-Healthcare/tree/main",
    },
  ];


  const certificatesAndAwards = [
    {
      title: "Salesforce AI Associate Certification",
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
        description: "Fundamentals of Model Contextg Protocol.",
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