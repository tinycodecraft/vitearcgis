// Fully commented on https://www.bricks-platform.com/BlogPost/Creating%20a%20Simple%20Map%20with%20OpenLayers%20and%20React
import React, { useRef, useEffect, useState } from "react";
import Bookmarks from "@arcgis/core/widgets/Bookmarks";
import Expand from "@arcgis/core/widgets/Expand";
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";
import BaseMap from "@arcgis/core/Basemap";
import VectorTileLayer from "@arcgis/core/layers/VectorTileLayer";
import Point from "@arcgis/core/geometry/Point";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import Search from "@arcgis/core/widgets/Search";
import SearchSource from "@arcgis/core/widgets/Search/LayerSearchSource";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import LayerSearchSource from "@arcgis/core/widgets/Search/LayerSearchSource";

function App() {
  const mapTargetElement = useRef<HTMLDivElement>(null);
  const apikey = "c84e886891014383bcf608423555b0ba";
  const [map, setMap] = useState<MapView>();

  useEffect(() => {
    const basemapVTURL = "https://mapapi.geodata.gov.hk/gs/api/v1.0.0/vt/basemap/HK80";
    const mapLabelVTUrl = "https://mapapi.geodata.gov.hk/gs/api/v1.0.0/vt/label/hk/tc/HK80";

    if (mapTargetElement.current) {
      /**
       * Initialize application
       */

      const basemap = new BaseMap({
        baseLayers: [
          new VectorTileLayer({
            url: basemapVTURL,
          }),
        ],
      });

      const webmap = new WebMap({
        basemap: basemap,
      });

      webmap.add(new VectorTileLayer({ url: mapLabelVTUrl }));

      const thisview = new MapView({
        container: mapTargetElement.current,
        map: webmap,
        center: new Point({ longitude: 833359.88495, latitude: 822961.986247, spatialReference: new SpatialReference({ wkid: 2326 }) }),
        zoom: 10,
      });

      const searchWidget = new Search({
        view: thisview,
        sources: [
          new LayerSearchSource({
            layer: new FeatureLayer({
              url: "https://geodata.gov.hk/gs/api/v1.0.0/locationSearch",
            }),
            searchFields: ["q"],
            displayField: "nameZH",
            exactMatch: false,
            outFields: ["addressZH", "nameZH", "x", "y", "addressEN", "nameEN"],
          }),
        ],

        goToOverride: (view, gotoParams) => {
          gotoParams.target.spatialReference = { wkid: 2326 };
          return view.goTo(gotoParams.target);
        },
      });

      thisview.ui.add(searchWidget, { position: "top-right" });
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
