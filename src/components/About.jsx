import React from "react";
import { motion } from "framer-motion";
import { services } from "../constants";

const ServiceCard = ({ index, title, icon }) => (
  <motion.div
    className="glass-card glow-effect"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.15 }}
  >
    <div className="flex flex-col items-center text-center">
      <div className="w-24 h-24 flex items-center justify-center mb-6">
        <img src={icon} alt={title} className="w-full h-full object-contain" />
      </div>
      <h3 className="text-white text-xl font-semibold">{title}</h3>
    </div>
  </motion.div>
);

const About = () => {
  return (
    <section id="about" className="section-padding relative">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="section-subtitle text-center">Introduction</p>
          <h2 className="section-title text-center mt-4 mb-16">Overview</h2>
        </motion.div>

        <motion.p
          className="body-large text-center max-w-3xl mx-auto mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          I'm a skilled AI Engineer with experience in machine learning, neural networks, and agentic AI systems.
          I specialize in building intelligent applications using frameworks like TensorFlow, PyTorch, and LangChain.
          Let's work together to bring your ideas to life!
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.title} index={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;