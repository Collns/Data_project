import AboutUs from "./components/AboutUs";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Services from "./components/Services";
import Book from "./components/book";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from 'axios';
import { useEffect } from "react";

const App = () => {

  // useEffect(() =>
  // {
  //   axios.get("http://localhost:3002/posts").then((response) =>
  //   {
  //     console.log(response);
  //   });

  // },[])

  return (
    <Router>
      <div>
        {/* Background Design */}
        <div className="relative h-full w-full bg-white">
          <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]">
          </div>
        </div>

        {/* Navbar */}
        <Navbar />

        {/* Main Content with Routes */}
        <Routes>
          {/* Dynamic Routes */}
          <Route
            path="/"
            element={
              <div>
                {/* All Components Displayed Simultaneously */}
                <div id="hero">
                  <Hero />
                </div>
                <div id="about-us">
                  <AboutUs />
                </div>
                <div id="services">
                  <Services />
                </div>
                <div id="book">
                  <Book/>
                
                </div>
              </div>
            }
          />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
        </Routes>
      </div>
    </Router>
    
  );
};

export default App;
