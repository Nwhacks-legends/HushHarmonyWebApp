import { getVenueMaker } from "@mappedin/mappedin-js";
import { useEffect, useState } from "react";

/**
 * Declarative API to fetch Mappedin data using getVenueMaker
 */
export default function useVenue(options) {
  // Store the venue object in a state variable
  const [venue, setVenue] = useState();

  // Fetch data asynchronously whenever options are changed
  useEffect(() => {
    let ignore = false;
    const fetchData = async () => {
      try {
        console.log(`[useVenueMaker] Fetching map with ID "${options.mapId}"`);
        const data = await getVenueMaker(options);
        // Update state variable after data is fetched
        if (!ignore) {
          console.log(`[useVenueMaker] Received map "${data.venue.name}"`);
          setVenue(data);
        }
      } catch (e) {
        // Handle error
        console.log(e);
        setVenue(undefined);
      }
    };
    fetchData();

    return () => {
      ignore = true;
    };
  }, [options]);

  // Return the venue object
  return venue;
}
