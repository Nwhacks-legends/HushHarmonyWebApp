import React, { useState } from "react";
import { motion } from "framer-motion";
import AboutUs from "./AboutUs";
import logo from "../assets/logo.png";

const LandingPage = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  const handleAboutClick = (event) => {
    event.preventDefault();
    document.getElementById("about").scrollIntoView({ behavior: "smooth" });
    setShowBackToTop(true);
  };

  const handleBackToTopClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setShowBackToTop(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-48">
      <motion.div
        className="flex justify-center items-center"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <img src={logo} alt="logo" className="w-32 h-32" />
        <motion.p
          className="text-2xl font-semibold ml-2"
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 20, opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <span className="text-hush">Hush</span> Harmony
        </motion.p>
      </motion.div>

      <motion.div
        className="flex mt-10 pt-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <a href="/mappedinview" className="btn-blue mx-2">
          MappedIn View
        </a>
        <a href="/googlemapview" className="btn-red mx-2">
          Google Map View
        </a>
      </motion.div>

      {!showBackToTop && (
        <div className="absolute bottom-10 w-full flex justify-center items-center">
          <a
            href="#about"
            onClick={handleAboutClick}
            className="cursor-pointer"
          >
            <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
              <motion.div
                animate={{ y: [0, 24, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
                className="w-4 h-4 rounded-full bg-secondary mb-1"
              />
            </div>
          </a>
        </div>
      )}

      {showBackToTop && (
        <button
          className="fixed bottom-10 right-10 w-10 h-10 bg-gray-900 text-white rounded cursor-pointer flex justify-center items-center"
          onClick={handleBackToTopClick}
        >
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6 fill-current"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 5l7 7h-5v7h-4v-7H5z" />
          </svg>
        </button>
      )}

      <AboutUs />
    </div>
  );
};

export default LandingPage;
