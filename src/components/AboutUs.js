import React from 'react';
import { motion } from 'framer-motion';

const AboutUs = () => {
  return (
    <motion.div
      id="about"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="flex flex-col items-center justify-center min-h-screen  p-4 mt-48" // Added a large top margin
    >
      <h1 className="text-2xl font-bold mb-4">About Us</h1>
      <p className="text-base">
        Welcome to our Hush Harmony! Here is some information about us!...
      </p>
    </motion.div>
  );
};

export default AboutUs;
