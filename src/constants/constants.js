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
      title: "Python Developer",
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
        "Designed and developed intuitive front-end interfaces, collaborating with cross-functional teams to deliver cutting-edge solutions, resulting in a 30% improvement in user satisfaction metrics and a 20% increase in website traffic",
        "Enhanced data extraction accuracy by implementing Python scripts with machine learning capabilities to tackle intricate business challenges, resulting in a 15% reduction in data errors and a 10% increase in data processing efficiency",
        "Led a team in constructing an Entity Relationship Diagram (ERD) while assisting in the development of an inventory management system for an Australian client's website, leading to a streamlined process that increased inventory turnover by 25%",
      ],
    },
    {
      title: "Figma Designer (Intern)",
      company_name: "XcitEducation Worldwide",
      icon: figma,
      iconBg: "#E6DEDD",
      date: "Feburary 2022 - April 2022",
      points: [
        "Crafted visually appealing and user-friendly interfaces for various digital platforms, collaborating with cross-functional teams to incorporate user feedback and iterate designs, resulting in a 20% increase in user engagement metrics ",
        "Implemented innovative design strategies for website, app, and social media interfaces within a global education enterprise, leading to a 15% improvement in overall user satisfaction ratings ",
        "Worked closely with the marketing team to analyze user behavior data and make data-driven design decisions that optimized conversion rates on digital platforms, resulting in a 10% increase in click-through rates",
      ],
    },
    {
      title: "Google Cloud Facilitator (Intern)",
      company_name: "Google",
      icon: Cloud1,
      iconBg: "#383E56",
      date: "April 2021 - June 2021",
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
  ];

  const certificatesAndAwards = [
    {
      title: "Certificate of Excellence in Web Development",
      description:
        "Awarded for outstanding performance in web development projects.",
      link: "https://example.com",
      icon: web,
    },
    {
      title: "Best Design Award",
      description: "Recognized for innovative and creative design solutions.",
      link: "https://example.com",
      icon: web,
    },
    {
      title: "Tech Innovator Award",
      description: "Honored for groundbreaking technological innovations.",
      link: "https://example.com",
      icon: carrent,
    },
    {
      title: "Coding Challenge Champion",
      description:
        "Winner of the national coding challenge competition for developers.",
      link: "https://example.com",
      icon: web,
    },
    {
      title: "Community Contribution Award",
      description:
        "Acknowledged for significant contributions to the developer community.",
      link: "https://example.com",
      icon: web,
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
        "Website development and Administration",
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