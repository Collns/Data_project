import React, { useState } from "react";
import AboutUs from "./components/AboutUs";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Services from "./components/Services";
import Book from "./components/Book.jsx"; // Explicitly using Book.jsx
import LoginPage from "./components/LoginPage"; 
import SignupPage from "./components/SignUpPage";
import AdminPage from "./components/AdminPage"; // Import your AdminPage component
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

const App = () => {
  const [token, setToken] = useState(null); // Token state to manage authentication

  // Decode the token to get user information
  const user = token ? JSON.parse(atob(token.split('.')[1])) : null;

  // Check if the user is an admin
  const isAdmin = user?.role === "admin";

  return (
    <Router>
      <div>
        {/* Background Design */}
        <div className="relative h-full w-full bg-white">
          <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]">
          </div>
        </div>

        {/* Navbar */}
        <Navbar token={token} setToken={setToken} user={user} />

        {/* Main Content with Routes */}
        <Routes>
          {/* Home Route */}
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
              </div>
            }
          />

          {/* About Us Page */}
          <Route path="/about" element={<AboutUs />} />

          {/* Services Page */}
          <Route path="/services" element={<Services />} />

          {/* Book Now */}
          <Route 
            path="/book" 
            element={token ? <Book user={user} /> : <Navigate to="/login" />} 
          />

          {/* Admin Page */}
          <Route 
            path="/admin" 
            element={
              token && isAdmin ? (
                <AdminPage user={user} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* Login Page */}
          <Route 
            path="/login" 
            element={<LoginPage setToken={setToken} />} 
          />

          {/* Signup Page */}
          <Route 
            path="/signup" 
            element={<SignupPage setToken={setToken} />} 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
