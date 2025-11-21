import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { github } from "../assets";
import { projects } from "../constants";

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <div className="gradient-card glow-effect h-full">
        <div className="relative w-full h-56 overflow-hidden rounded-xl">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />

          <div className="absolute inset-0 flex justify-end m-3">
            <div
              onClick={() => window.open(source_code_link, "_blank")}
              className="w-10 h-10 rounded-full flex justify-center items-center cursor-pointer backdrop-blur-md bg-white/10 hover:bg-white/20 transition-all duration-300"
            >
              <img
                src={github}
                alt="source code"
                className="w-5 h-5 object-contain"
              />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-white font-bold text-2xl">{name}</h3>
          <p className="mt-3 text-[var(--text-secondary)] text-[15px] leading-relaxed">
            {description}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={`${name}-${tag.name}`}
              className="px-4 py-1.5 text-[13px] font-medium rounded-full border border-[var(--glass-border)] backdrop-blur-sm bg-white/5"
            >
              #{tag.name}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Works = () => {
  return (
    <section id="projects" className="section-padding relative">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="section-subtitle">My work</p>
          <h2 className="section-title mt-4 mb-6">Projects</h2>
        </motion.div>

        <motion.p
          className="body-large max-w-3xl mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Following projects showcase my skills and experience through
          real-world examples of my work. Each project is briefly described with
          links to code repositories. It reflects my ability to solve complex
          problems, work with different technologies, and manage projects
          effectively.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={`project-${index}`} index={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Works;