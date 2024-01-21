import React, { useState } from "react";
import NavbarComponent from "./NavbarComponent";

const GoogleMapsPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      <NavbarComponent isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`transition-all duration-300 flex-grow ${
          isSidebarOpen ? "ml-32" : "ml-0"
        }`}
      >
        <div className="p-4 ml-2">
          <h1>Google Maps Page</h1>
          {/* Google Maps content goes here */}
        </div>
      </div>
    </div>
  );
};

export default GoogleMapsPage;
