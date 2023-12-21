// Fully commented on https://www.bricks-platform.com/BlogPost/Creating%20a%20Simple%20Map%20with%20OpenLayers%20and%20React
import React, { useRef, useEffect, useState } from "react";
import Bookmarks from '@arcgis/core/widgets/Bookmarks';
import Expand from '@arcgis/core/widgets/Expand';
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";



function App() {
  const mapTargetElement = useRef<HTMLDivElement>(null);
  const apikey = "c84e886891014383bcf608423555b0ba";
  const [map, setMap] = useState<MapView>();

  useEffect(() => {

    if (mapTargetElement.current) {
      /**
       * Initialize application
       */
      const webmap = new WebMap({
        portalItem: {
          id: "aa1d3f80270146208328cf66d022e09c"
        }
      });

      const view = new MapView({
        container: mapTargetElement.current,
        map: webmap
      });

      const bookmarks = new Bookmarks({
        view,
        // allows bookmarks to be added, edited, or deleted
        editingEnabled: true
      });

      const bkExpand = new Expand({
        view,
        content: bookmarks,
        expanded: true
      });

      // Add the widget to the top-right corner of the view
      view.ui.add(bkExpand, "top-right");

      // bonus - how many bookmarks in the webmap?
      webmap.when(() => {
        if (webmap.bookmarks && webmap.bookmarks.length) {
          console.log("Bookmarks: ", webmap.bookmarks.length);
        } else {
          console.log("No bookmarks in this webmap.");
        }
      });
    }
    // thismap.setTarget(mapTargetElement.current || "");
    // setMap(thismap);

    // return () => thismap.setTarget("");
  }, [mapTargetElement]);

  return (
    <div
      id="map"
      ref={mapTargetElement}
      className="mapDiv"
      style={{
        width: "1200px",
        height: "500px",
        position: "relative",
      }}
    ></div>
  );
}
export default App;
