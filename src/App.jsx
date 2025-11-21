import { BrowserRouter } from "react-router-dom";
import {
  About,
  Contact,
  Experience,
  Hero,
  Navbar,
  Tech,
  Works,
  StarsCanvas,
} from "./components";
import Education from "./components/Education";
import CertificatesandAward from "./components/CertificatesandAward";
import Blaze from "./components/Blaze";
import Layout from "./components/Layout";
import HeroScene from "./components/canvas/HeroScene";
import SmoothScroll from "./components/SmoothScroll";

const App = () => {
  return (
    <BrowserRouter>
      <SmoothScroll>
        <Layout>
          <div className="relative z-0 bg-primary">
            <HeroScene />
            <div className="relative z-10">
              <Navbar />
              <Hero />
            </div>

          <About />
          <Experience />
          <Tech />
          <Education />
          <Works />
          <CertificatesandAward />

          <div className="relative z-0">
            <Contact />
            <StarsCanvas />
          </div>
          {/* <Blaze /> */}
        </div>
      </Layout>
      </SmoothScroll>
    </BrowserRouter>
  );
};

export default App;
