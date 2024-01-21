import React from "react";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <motion.div
      id="about"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="flex flex-col items-center justify-center min-h-screen  p-4 mt-48 "
    >
      <h1 className="text-2xl font-bold mb-4">About Us</h1>
      <p className="text-base px-36">
        Welcome to our innovative solution designed for those seeking quieter
        environments and individuals with hearing aids who prefer less noisy
        locations. Our project, developed by a dedicated team from Simon Fraser
        University, focuses on measuring and mapping noise levels in various
        areas. Through our user-friendly mobile app, users contribute to a
        collective effort by sharing noise data from their locations. This data
        is then transformed into easy-to-understand visual maps,<span className="text-color"> allowing
        everyone to easily find areas with lower noise levels. Whether you're
        looking for a peaceful spot to study, relax, or if you use a hearing aid
        and need to find a comfortable auditory environment </span>, our tool is
        designed to guide you to the perfect location. Experience the ease of
        finding your quiet haven with our innovative noise mapping solution.
      </p>
    </motion.div>
  );
};

export default AboutUs;
