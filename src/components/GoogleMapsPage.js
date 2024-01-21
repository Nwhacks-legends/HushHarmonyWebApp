import React, { useEffect, useState } from "react";
import { useSocket } from "../SocketContext";
import NavbarComponent from "./NavbarComponent";

const GoogleMapsPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const socket = useSocket();
  const [heatmapLayer, setHeatmapLayer] = useState(null);
  const [heatmapData, setHeatmapData] = useState([]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const convertNoiseDataToHeatmapPoint = (data) => {
    const weight = Math.max(
      0,
      Math.min(1, (data.noiseData + 20) / (160))
    );
    return {
      location: new window.google.maps.LatLng(data.latitude, data.longitude),
      weight: weight,
    };
  };

  useEffect(() => {
    if (socket) {
      socket.on("newNoiseData", (data) => {
        console.log("New noise data received:", data);
        const newPoint = convertNoiseDataToHeatmapPoint(data);
        setHeatmapData((currentData) => [...currentData, newPoint]);
      });

      return () => {
        socket.off("newNoiseData");
      };
    }
  }, [socket]);

  useEffect(() => {
    if (heatmapLayer && heatmapData.length) {
      heatmapLayer.setData(heatmapData);
    }
  }, [heatmapData, heatmapLayer]);

  const loadGoogleMapsScript = () => {
    if (window.google) {
      return;
    }

    const scriptId = "google-maps-script";

    if (document.getElementById(scriptId)) {
      return;
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyD_WhDv78_GZQBsEvVGtxcAz4r3z2zt90w&libraries=visualization&callback=initMap`;
    script.async = true;
    document.head.appendChild(script);
  };

  window.initMap = () => {
    const map = new window.google.maps.Map(document.getElementById("map"), {
      zoom: 13,
      center: { lat: 49.2765, lng: -123.2177 },
      mapTypeId: "satellite",
    });

    const staticHeatmapData = [
      {
        location: new window.google.maps.LatLng(49.2765, -123.2177),
        weight: 0.5,
      },
      new window.google.maps.LatLng(49.2765, -123.2177),
      {
        location: new window.google.maps.LatLng(49.2765, -123.2177),
        weight: 2,
      },
      {
        location: new window.google.maps.LatLng(49.2765, -123.2177),
        weight: 3,
      },
      {
        location: new window.google.maps.LatLng(49.2765, -123.2177),
        weight: 2,
      },
      new window.google.maps.LatLng(49.2765, -123.2177),
      {
        location: new window.google.maps.LatLng(47.2765, -126.2177),
        weight: 0.5,
      },
      {
        location: new window.google.maps.LatLng(47.2765, -126.2177),
        weight: 3,
      },
      {
        location: new window.google.maps.LatLng(47.2765, -126.2177),
        weight: 2,
      },
      new window.google.maps.LatLng(47.2765, -126.2177),
      {
        location: new window.google.maps.LatLng(47.2765, -126.2177),
        weight: 0.5,
      },
      new window.google.maps.LatLng(47.2765, -126.2177),
      {
        location: new window.google.maps.LatLng(49.262536, -123.254053),
        weight: 2,
      },
      {
        location: new window.google.maps.LatLng(49.262536, -123.254053),
        weight: 3,
      },
    ];
    setHeatmapData(staticHeatmapData);

    const gradient = [
      "rgba(255, 255, 0, 0)", // Yellow, low opacity for low intensity
      "rgba(255, 255, 0, 1)", // Yellow, high opacity for slightly higher intensity
      "rgba(255, 165, 0, 1)", // Orange for medium intensity
      "rgba(255, 0, 0, 1)", // Red for high intensity
    ];

    const layer = new window.google.maps.visualization.HeatmapLayer({
      data: staticHeatmapData,
      map: map,
      gradient: gradient,
      radius: 25, // Adjust this value to change the size of the heat circles
    });
    setHeatmapLayer(layer);
  };

  useEffect(() => {
    loadGoogleMapsScript();
  }, []);

  return (
    <div className="flex">
      <NavbarComponent
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <div
        className={`transition-all duration-300 flex-grow ${
          isSidebarOpen ? "ml-32" : "ml-0"
        }`}
      ></div>
      <div id="map" style={{ height: "100vh", width: "100%" }} />
    </div>
  );
};

export default GoogleMapsPage;
