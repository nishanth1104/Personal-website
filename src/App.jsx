import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import Navigation from './components/Navigation';
import ScrollProgress from './components/ScrollProgress';
import SceneManager from './components/SceneManager';
import { projects } from './constants';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPhase, setCurrentPhase] = useState(1);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    if (isLoading) return;

    // Setup scroll triggers for phase transitions
    const sections = document.querySelectorAll('.content-section');

    sections.forEach((section, index) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setCurrentPhase(index + 1),
        onEnterBack: () => setCurrentPhase(index + 1),
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isLoading]);

  const handlePhaseClick = (phaseNumber) => {
    const section = document.getElementById(`phase${phaseNumber}`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return <Preloader onComplete={handlePreloaderComplete} />;
  }

  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <Navigation currentPhase={currentPhase} onPhaseClick={handlePhaseClick} />

      {/* Single Fixed 3D Canvas */}
      <SceneManager currentPhase={currentPhase} />

      {/* Scrollable Content Container */}
      <main className="content-container">

        {/* PHASE 1: DATA NUCLEUS */}
        <section id="phase1" className="content-section">
          <div className="content-wrapper">
            <div className="content-center">
              <h1 className="title-hero">
                NISHANTH
                <br />
                AYYALASOMAYAJULA
              </h1>
              <p className="subtitle-large">
                AI ENGINEER | BUILDING INTELLIGENT SYSTEMS
              </p>
              <p className="body-text">
                From raw data to autonomous intelligence — architecting the future of AI systems
              </p>
            </div>
          </div>
        </section>

        {/* PHASE 2: MODEL AWAKENING */}
        <section id="phase2" className="content-section">
          <div className="content-wrapper">
            <div className="content-center">
              <p className="subtitle-small">INTELLIGENCE EMERGES</p>
              <h2 className="title-large">Model Awakening</h2>
              <p className="body-text">
                Neural networks learn patterns, make predictions, and power intelligent systems
              </p>
            </div>

            {/* Metrics HUD */}
            <div className="metrics-hud">
              <div className="metric-card">
                <div className="metric-label">Models Trained</div>
                <div className="metric-value cyan">50+</div>
              </div>
              <div className="metric-card">
                <div className="metric-label">Avg Accuracy</div>
                <div className="metric-value purple">94.2%</div>
              </div>
              <div className="metric-card">
                <div className="metric-label">Inference Time</div>
                <div className="metric-value green">&lt;100ms</div>
              </div>
            </div>

            {/* Projects Grid */}
            <div className="projects-grid">
              {projects.slice(0, 3).map((project, idx) => (
                <div key={project.name} className="project-card">
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <div className="project-tags">
                    {project.tags?.map(tag => (
                      <span key={tag.name} className="tag">{tag.name}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PHASE 3: AGENT ARCHITECTURE */}
        <section id="phase3" className="content-section">
          <div className="content-wrapper">
            <div className="content-center">
              <p className="subtitle-small">ORCHESTRATED INTELLIGENCE</p>
              <h2 className="title-large">Agent Architecture</h2>
              <p className="body-text">
                Specialized AI agents collaborate to solve complex problems through intelligent orchestration
              </p>
            </div>

            {/* Agent Info Cards */}
            <div className="agent-grid">
              <div className="agent-card">
                <div className="agent-icon cyan">R</div>
                <h4>Router Agent</h4>
                <p>Routes queries to specialized agents</p>
              </div>
              <div className="agent-card">
                <div className="agent-icon purple">T</div>
                <h4>Retrieval Agent</h4>
                <p>Fetches relevant information from knowledge bases</p>
              </div>
              <div className="agent-card">
                <div className="agent-icon green">S</div>
                <h4>SQL Agent</h4>
                <p>Executes database queries and operations</p>
              </div>
            </div>
          </div>
        </section>

        {/* PHASE 4: ECOSYSTEM INTEGRATION */}
        <section id="phase4" className="content-section">
          <div className="content-wrapper">
            <div className="content-center">
              <p className="subtitle-small">CONNECTED SYSTEMS</p>
              <h2 className="title-large">Ecosystem Integration</h2>
              <p className="body-text">
                Seamless integration across cloud services, databases, and infrastructure
              </p>
            </div>

            {/* Metrics Dashboard */}
            <div className="ecosystem-metrics">
              <div className="metric-card">
                <div className="metric-label">Uptime</div>
                <div className="metric-value green">99.9%</div>
              </div>
              <div className="metric-card">
                <div className="metric-label">Latency</div>
                <div className="metric-value cyan">45ms</div>
              </div>
              <div className="metric-card">
                <div className="metric-label">Throughput</div>
                <div className="metric-value purple">10K/s</div>
              </div>
            </div>
          </div>
        </section>

        {/* PHASE 5: AUTONOMOUS MULTIVERSE */}
        <section id="phase5" className="content-section">
          <div className="content-wrapper">
            <div className="content-center">
              <p className="subtitle-small">THE FUTURE IS NOW</p>
              <h2 className="title-large">Autonomous Multiverse</h2>
              <p className="body-text">
                AI systems deployed across industries, creating intelligent solutions at scale
              </p>
            </div>

            {/* Contact Form */}
            <div className="contact-form">
              <h3>Let's Connect</h3>
              <form className="form">
                <input type="text" placeholder="Your Name" required />
                <input type="email" placeholder="Your Email" required />
                <textarea placeholder="Your Message" rows="4" required />
                <button type="submit" className="btn-primary">Send Message</button>
              </form>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}

export default App;
