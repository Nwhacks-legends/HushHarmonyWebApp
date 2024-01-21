import React, { useEffect } from 'react';

const GoogleMapsPage = () => {
  const loadGoogleMapsScript = () => {
    if (window.google) {
        return;
      }
    
      const scriptId = 'google-maps-script';
    
      if (document.getElementById(scriptId)) {
        return;
      }
    
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyD_WhDv78_GZQBsEvVGtxcAz4r3z2zt90w&libraries=visualization&callback=initMap`;
      script.async = true;
      document.head.appendChild(script);
    };
    

  window.initMap = () => {
    // Initialize your map here
    const map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: { lat: 49.2765, lng: -123.2177},
      mapTypeId: 'satellite',
    });

    const heatmapData = [
        {location: new window.google.maps.LatLng(49.2765, -123.2177), weight: 0.5},
        new window.google.maps.LatLng(49.2765, -123.2177),
        {location: new window.google.maps.LatLng(49.2765, -123.2177), weight: 2},
        {location: new window.google.maps.LatLng(49.2765, -123.2177), weight: 3},
        {location: new window.google.maps.LatLng(49.2765, -123.2177), weight: 2},
        new window.google.maps.LatLng(49.2765, -123.2177),
        {location: new window.google.maps.LatLng(47.2765, -126.2177), weight: 0.5},
        {location: new window.google.maps.LatLng(47.2765, -126.2177), weight: 3},
        {location: new window.google.maps.LatLng(47.2765, -126.2177), weight: 2},
        new window.google.maps.LatLng(47.2765, -126.2177),
        {location: new window.google.maps.LatLng(47.2765, -126.2177), weight: 0.5},
        new window.google.maps.LatLng(47.2765, -126.2177),
        {location: new window.google.maps.LatLng(49.262536, -123.254053), weight: 2},
        {location: new window.google.maps.LatLng(49.262536, -123.254053), weight: 3}
    ];

    new window.google.maps.visualization.HeatmapLayer({
      data: heatmapData,
      map: map,
    });
  };

  useEffect(() => {
    loadGoogleMapsScript();
  }, []);

  return (
    <div id="map" style={{ height: '100vh', width: '100%' }} />
  );
};

export default GoogleMapsPage;
