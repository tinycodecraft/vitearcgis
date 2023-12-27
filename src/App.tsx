// Fully commented on https://www.bricks-platform.com/BlogPost/Creating%20a%20Simple%20Map%20with%20OpenLayers%20and%20React
import React, { useRef, useEffect, useState } from "react";
// import Bookmarks from "@arcgis/core/widgets/Bookmarks";
// import Expand from "@arcgis/core/widgets/Expand";
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";
import BaseMap from "@arcgis/core/Basemap";
import VectorTileLayer from "@arcgis/core/layers/VectorTileLayer";
import Point from "@arcgis/core/geometry/Point";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import Search from "@arcgis/core/widgets/Search";
import request from "@arcgis/core/request";
import SearchSource from "@arcgis/core/widgets/Search/SearchSource";
import {A, pipe}  from '@mobily/ts-belt'

// import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
// import LayerSearchSource from "@arcgis/core/widgets/Search/LayerSearchSource";
// import * as geometryEngine from "@arcgis/core/geometry/geometryEngine";
import Graphic from "@arcgis/core/Graphic";
// import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import { sort } from "fast-sort";

interface ItemSuggestion {
  addressZH: string;
  nameZH: string;
  x: number;
  y: number;
  nameEN: string;
  addressEN: string;
}
interface NearBySuggestion {
  address?: string;
  additionalInfoValue?: string[];
  name?: string;
  x: number;
  y: number;
  additionalInfoKey?: string[];
}
const idGen = (() => {
  let id = 0
  return () => id++
})()

function App() {
  const mapTargetElement = useRef<HTMLDivElement>(null);
  const apikey = "c84e886891014383bcf608423555b0ba";
  const [map, setMap] = useState<MapView>();

  useEffect(() => {
    const basemapVTURL = "https://mapapi.geodata.gov.hk/gs/api/v1.0.0/vt/basemap/HK80";
    const mapLabelVTUrl = "https://mapapi.geodata.gov.hk/gs/api/v1.0.0/vt/label/hk/tc/HK80";
    const locationSearchUrl = "https://geodata.gov.hk/gs/api/v1.0.0/locationSearch";
    const nearBySearchUrl = "https://geodata.gov.hk/gs/api/v1.0.0/searchNearby";

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

      const locationSource = new SearchSource({
        placeholder: "HK Gov CSDI search",

        getResults: (params) => {
          console.log(`the parameters from results`, params);

          const outerGraphic = new Graphic({
            geometry: new Point({
              x: params?.suggestResult?.x,
              y: params?.suggestResult?.y,
              spatialReference: new SpatialReference({ wkid: 2326 }),
            }),
          });

          return request(nearBySearchUrl, {
            query: {
              x: params?.suggestResult?.x,
              y: params?.suggestResult?.y,
              lang: "en",
            },
            responseType: "json",
          }).then((result) => {
            console.log(`the result item returned from nearby`, result);

            const results = result.data
              .filter((e: NearBySuggestion) => e.address && e.address !== "")
              .slice(0, 3)
              .map((item: NearBySuggestion) => {
                const graphic = new Graphic({
                  geometry: new Point({ x: item.x, y: item.y, spatialReference: new SpatialReference({ wkid: 2326 }) }),
                });
                return {
                  extent: graphic.geometry.extent,
                  feature: graphic,
                  name: item.name,
                };
              });

            if (!results || results.length == 0) {
              console.log(`the suggestResult cannot get any nearby`, params?.suggestResult);
              return [
                {
                  extent: outerGraphic.geometry.extent,
                  feature: outerGraphic,
                  name: params?.suggestResult.text,
                },
              ];
            }

            return [
              {
                extent: outerGraphic.geometry.extent,
                feature: outerGraphic,
                name: params?.suggestResult.text,
              },
              ...results,
            ];
          });
        },

        outFields: [ "text"],
        
        getSuggestions: (params) => {
          console.log(`test parameters from getsuggestions`,params)
          return request(locationSearchUrl, {
            query: {
              q: params.suggestTerm.replace(/ /g, "+"),
            },
            responseType: "json",
          }).then((result) => {
            console.log(`the result from suggestions`, result);
            
            const data =  result.data.map((item: ItemSuggestion) => {
              let text = item.addressEN;
              if (!text) text = item.addressZH;
              else {
                text += `\n${item.addressZH}`;
              }
              if (!text) {
                text = item.nameEN;
                if (!text) {
                  text = item.nameZH;
                } else {
                  text += `\n${item.nameZH}`;
                }
              }

              return {
                key: `${item.x}!${item.y}`,
                text: text,
                addressEN: item.addressEN,
                sourceIndex: params.sourceIndex,
                addressZH: item.addressZH,
                nameEN: item.nameEN,
                nameZH: item.nameZH,
                x: item.x,
                y: item.y,
                spatialReference: params.spatialReference,
              };
            });

            const transdata =  sort(data as { key: string, text: string, sourceIndex: number, spatialReference: SpatialReference}[]).desc([u=> u.text]);

            return pipe(transdata,A.uniqBy(e=> e.text)).map(e=> e);

          });
        },
      });


      const searchWidget = new Search({
        view: thisview,
        sources: [
          locationSource,
          // new LayerSearchSource({

          //   layer: new FeatureLayer({
          //     url: "https://geodata.gov.hk/gs/api/v1.0.0/locationSearch",
          //     spatialReference: new SpatialReference({wkid: 2326}),

          //     outFields: ["addressZH", "nameZH", "x", "y", "addressEN", "nameEN"],
          //   }),

          //   searchFields: ["q"],
          //   displayField: "nameZH",
          //   exactMatch: false,
          //   outFields: ["addressZH", "nameZH", "x", "y", "addressEN", "nameEN"],

          // })
        ],
        includeDefaultSources: false,

        goToOverride: (view, gotoParams) => {
          console.log(`the parameters from goto`, gotoParams);
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
