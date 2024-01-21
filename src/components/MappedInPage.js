import React, { useState, useEffect, useMemo } from "react";
import NavbarComponent from "./NavbarComponent";
import "@mappedin/mappedin-js/lib/mappedin.css";
import useMapView from "../hooks/useMapView";
import useVenueMaker from "../hooks/useVenueMaker";
import { useSocket } from "../SocketContext"; // Import the useSocket hook

const MappedInPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const socket = useSocket(); // Get the socket instance

  const credentials = useMemo(
    () => ({
      mapId: "657cc670040fcba69696e69e",
      key: "65a0422df128bbf7c7072349",
      secret:
        "5f72653eba818842c16c4fdb9c874ae02100ffced413f638b7bd9c65fd5b92a4",
    }),
    []
  );

  const venue = useVenueMaker(credentials);

  const mapOptions = useMemo(
    () => ({
      backgroundColor: "#6e6b67",
    }),
    []
  );

  const { elementRef, mapView } = useMapView(venue, mapOptions);

  const addMarkerAtLatLon = (latitude, longitude, noiseData) => {
    if (!mapView || !mapView.currentMap) {
      console.error("MapView or CurrentMap is not loaded");
      return;
    }

    const coordinate = mapView.currentMap.createCoordinate(latitude, longitude);

    // Determine color gradient based on noise data
    let gradientClass;
    if (noiseData < 55) {
      gradientClass = "bg-green-yellow-gradient";
    } else if (noiseData >= 55 && noiseData <= 85) {
      gradientClass = "bg-yellow-orange-gradient";
    } else {
      gradientClass = "bg-orange-red-gradient";
    }

    const markerTemplate = `
  <div class="marker ${gradientClass}">
    <p>Marker</p>
  </div>`;

    mapView.Markers.add(coordinate, markerTemplate);
  };

  useEffect(() => {
    if (!mapView || !venue) {
      return;
    }

    mapView.FloatingLabels.labelAllLocations();

    // Listen to socket for new data
    if (socket) {
      socket.on("newNoiseData", (data) => {
        console.log("New noise data received:", data);
        addMarkerAtLatLon(data.latitude, data.longitude, data.noiseData);
      });

      return () => {
        socket.off("newNoiseData");
      };
    }
  }, [mapView, venue, socket]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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
      >
        <div className="p-4 ml-2">
          <h1>This is the MappedIn Page</h1>
          <p>Welcome to the MappedIn page!</p>
          <div id="ui">
            {venue?.venue.name ?? "Loading..."}
            {venue && (
              <select
                onChange={(e) => {
                  if (!mapView || !venue) {
                    return;
                  }

                  const floor = venue.maps.find(
                    (map) => map.id === e.target.value
                  );
                  if (floor) {
                    mapView.setMap(floor);
                  }
                }}
              >
                {venue?.maps.map((level, index) => (
                  <option value={level.id} key={index}>
                    {level.name}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div id="map-container" ref={elementRef}></div>
        </div>
      </div>
    </div>
  );
};

export default MappedInPage;
