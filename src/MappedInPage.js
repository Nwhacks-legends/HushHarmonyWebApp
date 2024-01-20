import React, { useEffect, useMemo } from "react";
import {
  TGetVenueMakerOptions,
  TMapViewOptions,
} from "@mappedin/mappedin-js";
import "@mappedin/mappedin-js/lib/mappedin.css";
import useMapView from "./hooks/useMapView";
import useVenueMaker from "./hooks/useVenueMaker";

const MappedInPage = () => {
  const credentials = useMemo(
    () => ({
      mapId: "659efcf1040fcba69696e7b6",
      key: "65a0422df128bbf7c7072349",
      secret: "5f72653eba818842c16c4fdb9c874ae02100ffced413f638b7bd9c65fd5b92a4",
    }),
    []
  );

  const venue = useVenueMaker(credentials);

  const mapOptions = useMemo(
    () => ({
      backgroundColor: "#CFCFCF",
    }),
    []
  );

  const { elementRef, mapView } = useMapView(venue, mapOptions);

  useEffect(() => {
    if (!mapView || !venue) {
      return;
    }

    mapView.FloatingLabels.labelAllLocations();
  }, [mapView, venue]);

  return (
    <div>
      <h1>This is the New Page</h1>
      <p>Welcome to the new page!</p>
      <div id="ui">
        {venue?.venue.name ?? "Loading..."}
        {venue && (
          <select
            onChange={(e) => {
              if (!mapView || !venue) {
                return;
              }

              const floor = venue.maps.find((map) => map.id === e.target.value);
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
  );
};

export default MappedInPage;
