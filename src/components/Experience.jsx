import React from "react";
import { motion } from "framer-motion";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import "react-vertical-timeline-component/style.min.css";

import { educations } from "../constants";

const ExperienceCard = ({ education }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "var(--glass-bg)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid var(--glass-border)",
        borderRadius: "20px",
        padding: "40px",
        boxShadow: "none",
      }}
      contentArrowStyle={{ borderRight: "7px solid var(--glass-border)" }}
      date={education.date}
      iconStyle={{
        background: education.iconBg,
        boxShadow: "0 0 0 4px var(--glass-border)",
      }}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          <img
            src={education.icon}
            alt={education.company_name}
            className="w-[60%] h-[60%] object-contain"
          />
        </div>
      }
    >
      <div>
        <h3 className="text-white text-2xl font-bold">{education.title}</h3>
        <p
          className="text-[var(--text-secondary)] text-base font-semibold mt-2"
          style={{ margin: 0 }}
        >
          {education.company_name}
        </p>
      </div>

      <ul className="mt-6 list-disc ml-5 space-y-2">
        {education.points.map((point, index) => (
          <li
            key={`education-point-${index}`}
            className="text-[var(--text-secondary)] text-[15px] pl-1 tracking-wide leading-relaxed"
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  return (
    <section id="work" className="section-padding relative">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="section-subtitle text-center">What I have done so far</p>
          <h2 className="section-title text-center mt-4 mb-20">Education</h2>
        </motion.div>

        <div className="mt-20 flex flex-col">
          <VerticalTimeline lineColor="var(--glass-border)">
            {educations.map((education, index) => (
              <ExperienceCard
                key={`education-${index}`}
                education={education}
              />
            ))}
          </VerticalTimeline>
        </div>
      </div>
    </section>
  );
};

export default Experience;