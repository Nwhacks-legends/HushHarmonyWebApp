import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RecordPage = () => {
  const [audioLevel, setAudioLevel] = useState(0);
  const [location, setLocation] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    let audioContext;
    let analyzer;
    let microphone;

    const getMicrophoneAccess = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        audioContext = new AudioContext();
        analyzer = audioContext.createAnalyser();
        microphone = audioContext.createMediaStreamSource(stream);
        microphone.connect(analyzer);
      } catch (error) {
        console.error('Error accessing microphone:', error);
      }
    };

    const getLocation = () => {
      if (!navigator.geolocation) {
        console.error('Geolocation is not supported by your browser');
      } else {
        navigator.geolocation.getCurrentPosition((position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        }, () => {
          console.error('Unable to retrieve your location');
        });
      }
    };

    const calculateDecibels = () => {
      const dataArray = new Uint8Array(analyzer.frequencyBinCount);
      analyzer.getByteFrequencyData(dataArray);
      const rms = dataArray.reduce((acc, val) => acc + val * val, 0) / dataArray.length;
      const decibels = 20 * Math.log10(Math.sqrt(rms));
      setAudioLevel(decibels);
    };

    const mapDecibelsToHeatmapValue = (decibels) => {
      const minDb = 20;
      const maxDb = 120;
      const range = maxDb - minDb;
      const heatmapRange = 4.5;
      return ((decibels - minDb) / range) * heatmapRange + 0.5;
    };

    const sendToApi = () => {
      const heatmapValue = mapDecibelsToHeatmapValue(audioLevel);
      axios.post('http://localhost:8080/collect-noise-data', {
        noise: {
          decibels: audioLevel,
          heatmapValue: heatmapValue
        },
        long: location.longitude,
        lat: location.latitude
      })
      .then(response => console.log(response.data))
      .catch(error => console.error('Error sending data to API:', error));
    };

    getMicrophoneAccess();
    getLocation();

    const interval = setInterval(() => {
      if (analyzer && location.latitude && location.longitude) {
        calculateDecibels();
        sendToApi();
      }
    }, 1000); // Adjusted interval to 10 seconds

    return () => {
      clearInterval(interval);
      if (audioContext) audioContext.close();
    };
  }, [audioLevel, location]);

  return (
    <div>
      <h1>Recording in progress...</h1>
      <p>Current Audio Level: {audioLevel.toFixed(2)} dB</p>
      <p>Location: {location.latitude ? `${location.latitude}, ${location.longitude}` : 'Location not available'}</p>
    </div>
  );
};

export default RecordPage;
