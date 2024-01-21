import React from 'react';
import { motion } from 'framer-motion';
import AboutUs from './AboutUs';
import logo from '../assets/logo.png';

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-48">
      <motion.div
        className="flex justify-center items-center"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <img
          src={logo}
          alt="logo"
          className="w-32 h-32"
        />
        <motion.p
          className="text-2xl font-semibold ml-2"
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 20, opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Hush Harmony
        </motion.p>
      </motion.div>
      <motion.div
        className="flex mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <a href="/mappedinview" className="btn-blue mx-2">MappedIn View</a>
        <a href="/googlemapview" className="btn-red mx-2">Google Map View</a>
      </motion.div>

      <div className="absolute bottom-10 w-full flex justify-center items-center "> {/* Adjusted the bottom class */}
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{ y: [0, 24, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
              className="w-4 h-4 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>

      <AboutUs />
    </div>
  );
};

export default LandingPage;
