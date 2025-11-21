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

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <div className="relative z-0 bg-primary">
          <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
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
    </BrowserRouter>
  );
};

export default App;
