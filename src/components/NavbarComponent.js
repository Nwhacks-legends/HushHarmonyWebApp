import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import MenuIcon from '../assets/menu.svg';

const NavbarComponent = ({ isSidebarOpen, toggleSidebar }) => {
  const sidebarVariants = {
    open: {
      x: 0,
      transition: { type: 'spring', stiffness: 20 }
    },
    closed: {
      x: '-100%',
      transition: { type: 'spring', stiffness: 20 }
    }
  };

  return (
    <div className="flex">
      <div className="z-20 p-4 cursor-pointer" onClick={toggleSidebar}>
        <img src={MenuIcon} alt="Menu" className="h-6 w-6" />
      </div>

      <motion.div
        initial="closed"
        animate={isSidebarOpen ? "open" : "closed"}
        variants={sidebarVariants}
        className="fixed top-0 left-0 h-full bg-gray-800 text-white z-10"
      >
        <ul className="mt-16 p-3">
          <li className="py-3 hover:bg-gray-900 rounded-sm">
            <Link to="/" className="hover:text-gray-300 block px-1">Home</Link>
          </li>
          <li className="py-3 hover:bg-gray-900 rounded-sm">
            <Link to="/mappedinview" className="hover:text-gray-300 block px-1">MappedIn View</Link>
          </li>
          <li className="py-3 hover:bg-gray-900 rounded-sm">
            <Link to="/googlemapview" className="hover:text-gray-300 block px-1">Google Maps Overlay</Link>
          </li>
          <li className="py-3 hover:bg-gray-900 rounded-sm">
            <Link to="/record" className="hover:text-gray-300 block px-1">Record Noise</Link>
          </li>
        </ul>
      </motion.div>
    </div>
  );
};

export default NavbarComponent;
