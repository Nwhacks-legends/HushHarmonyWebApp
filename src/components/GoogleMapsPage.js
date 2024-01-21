import React, { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
};

const GoogleMapsPage = () => {
  const [currentLocation, setCurrentLocation] = useState({
    lat: 49.2606, // default latitude to ubc
    lng: 123.2460, // default longitude to ubc
  });
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyD_WhDv78_GZQBsEvVGtxcAz4r3z2zt90w',
    libraries,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        // handle error, or use default location
      }
    );
  }, []);

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={currentLocation}
      >
        <Marker position={currentLocation} />
      </GoogleMap>
    </div>
  );
};

export default GoogleMapsPage;
