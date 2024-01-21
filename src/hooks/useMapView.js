import { showVenue } from "@mappedin/mappedin-js";
import { useCallback, useEffect, useRef, useState } from "react";

export default function useMapView(
  venue,
  options
) {
  const [mapView, setMapView] = useState();
  const mapRef = useRef(null);
  const isRendering = useRef(false);

  const renderVenue = useCallback(
    async (el, venue, options) => {
      if (isRendering.current === true || mapView != null) {
        return;
      }

      isRendering.current = true;

      console.log(
        `[useMapView] Rendering "${venue.venue.name}" to element "${el.id}".`
      );
      const _mapView = await showVenue(el, venue, options);
      setMapView(_mapView);

      isRendering.current = false;
    },
    [isRendering, mapView, setMapView]
  );

  const elementRef = useCallback(
    (element) => {
      if (element === null) {
        return;
      }

      mapRef.current = element;

      if (mapView === null && venue != null && isRendering.current === false) {
        renderVenue(element, venue, options);
      }
    },
    [renderVenue, mapView, isRendering, mapRef]
  );

  useEffect(() => {
    if (mapView) {
      return;
    }

    if (mapRef.current != null && venue != null) {
      renderVenue(mapRef.current, venue, options);
    }
  }, [venue, mapRef.current, mapView, renderVenue]);

  return { mapView, elementRef };
}
