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
import LayerSearchSource from "@arcgis/core/widgets/Search/LayerSearchSource";
import { A, pipe } from "@mobily/ts-belt";
import Extent from "@arcgis/core/geometry/Extent";
import config from "@arcgis/core/config";
// import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
// import LayerSearchSource from "@arcgis/core/widgets/Search/LayerSearchSource";
// import * as geometryEngine from "@arcgis/core/geometry/geometryEngine";
import Graphic from "@arcgis/core/Graphic";
// import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import { sort } from "fast-sort";

/*
  proxy means :   the request client is changed to proxy server, such that the proxy server will act as client to get the result 
                  from the target server
  reverse proxy:  the target resource is changed to proxy server, such that the proxy server will act for client to get the result 
                  from hidden target server
*/
interface ItemSuggestion {
  addressZH: string;
  nameZH: string;
  x: number;
  y: number;
  nameEN: string;
  addressEN: string;
}
interface ItemSuggestionWithText extends ItemSuggestion {
  text: string;
  key: string;
  sourceIndex: number;
}
interface NearBySuggestion {
  address?: string;
  additionalInfoValue?: string[];
  name?: string;
  x: number;
  y: number;
  additionalInfoKey?: string[];
}

const createPointResult = (x?: number, y?: number, text?: string, label?: string) => {
  if (x && y && text) {
    const outerPoint = new Point({
      x: x,
      y: y,
      spatialReference: new SpatialReference({ wkid: 2326 }),
    });
    const outerGraphic = new Graphic({
      geometry: outerPoint,
      attributes: {
        x: x,
        y: y,
        spatialReference: new SpatialReference({ wkid: 2326 }),
        label: label ?? text,
        name: text,
      },
    });

    const bufferXInDegrees = 1;
    const bufferYInDegrees = 1;

    // Create an extent based on the point and buffer distances
    const outerExtent = new Extent({
      xmin: x - bufferXInDegrees,
      ymin: y - bufferYInDegrees,
      xmax: x + bufferXInDegrees,
      ymax: y + bufferYInDegrees,
      spatialReference: outerGraphic.geometry.spatialReference,
    });
    outerExtent.expand(50);

    return {
      extent: outerExtent,
      feature: outerGraphic,
      name: text,
    };
  }

  return undefined;
};

function App() {
  const mapTargetElement = useRef<HTMLDivElement>(null);
  const apikey = "84d61c19659a4cc7afe7cda7a903deb6";
  const [map, setMap] = useState<MapView>();

  useEffect(() => {
    const basemapVTURL = "https://mapapi.geodata.gov.hk/gs/api/v1.0.0/vt/basemap/HK80";
    const mapLabelVTUrl = "https://mapapi.geodata.gov.hk/gs/api/v1.0.0/vt/label/hk/tc/HK80";
    const locationSearchUrl = "/locsearch";
    const nearBySearchUrl = "https://geodata.gov.hk/gs/api/v1.0.0/searchNearby";

    if (mapTargetElement.current) {
      /**
       * Initialize application
       */
      /*
    basemap: "https://api.hkmapservice.gov.hk/ags/map/basemap/WGS84?key=84d61c19659a4cc7afe7cda7a903deb6",
    basemapGnet: "https://mapapi.landsd.ccgo.hksarg/ags/map/basemap/WGS84?key=4ba543f0-8fb7-3c87-bc75-e2db85930c63",
    labelmapTCUrl: "https://api.hkmapservice.gov.hk/ags/map/label-tc/WGS84?key=84d61c19659a4cc7afe7cda7a903deb6",
    labelmapSCUrl: "https://api.hkmapservice.gov.hk/ags/map/label-sc/WGS84?key=84d61c19659a4cc7afe7cda7a903deb6",
    labelmapENUrl: "https://api.hkmapservice.gov.hk/ags/map/label-en/WGS84?key=84d61c19659a4cc7afe7cda7a903deb6",
*/

      if (config.request.interceptors) {
        config.request.interceptors.push({
          before: function (params) {
            params.requestOptions.query = {
              ...params.requestOptions.query,
              key: apikey,
            };
          },
        });
      }

      const baseLayer = new VectorTileLayer({
        url: basemapVTURL,
      });

      const basemap = new BaseMap({
        baseLayers: [baseLayer],
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

      const locationSource = new LayerSearchSource({
        placeholder: "HK Gov CSDI search",

        layer: baseLayer,
        zoomScale: 240,
        suffix: " ",

        getResults: (params) => {
          console.log(`the parameters from results`, params);

          const outerResult = createPointResult(params?.suggestResult?.x, params?.suggestResult?.y, params?.suggestResult?.text);
          if (outerResult === undefined) {
            return fetch(
              locationSearchUrl +
                "?" +
                new URLSearchParams({
                  q: params.suggestResult.text.replace(/ /g, "+"),
                })
            )
              .then((raw) => raw.json())
              .then((data) => {
                const result = data.map((item: ItemSuggestion) => {
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

                const transdata = sort(result as ItemSuggestionWithText[]).desc([(u) => u.text.length, (u) => u.text]);

                const unqdata = pipe(
                  transdata,
                  A.uniqBy((e) => e.text.replace(/ /g, ""))
                ).map((e) => e);

                if (unqdata && unqdata.length > 0) {
                  const firstdata = unqdata[0] as ItemSuggestionWithText;
                  const firstouterResult = createPointResult(firstdata.x, firstdata.y, firstdata.text, firstdata.text);
                  return [firstouterResult];
                }
                return [];
              });
          } else {
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
                .slice(0, 1)
                .map((item: NearBySuggestion) => {
                  const innerResult = createPointResult(item.x, item.y, item.name, item.address);

                  return innerResult;
                });

              if (!results || results.length == 0) {
                console.log(`the suggestResult cannot get any nearby`, params?.suggestResult);
                return [outerResult];
              }
              console.log(`some nearby found!!`);
              return [outerResult, ...results];
            });
          }
        },

        outFields: ["text"],
        autoNavigate: true,

        getSuggestions: (params) => {
          console.log(`test parameters from getsuggestions`, params);
          const rawTerm = (params.suggestTerm as string) || " ";
          const suggestTerm = rawTerm + " ";
          return fetch(
            locationSearchUrl +
              "?" +
              new URLSearchParams({
                q: suggestTerm.replace(/ /g, "+"),
              }),
            {
              headers: [],
            }
          )
            .then((raw) => raw.json())
            .then((result) => {
              console.log(`the result from suggestions`, result);
              // result.data
              const data = result.map((item: ItemSuggestion) => {
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

              const transdata = sort(data as ItemSuggestionWithText[]).desc([
                (u) => u.text.length,
                (u) => u.text,
              ]);

              return pipe(
                transdata,
                A.uniqBy((e) => e.text.replace(/ /g, ""))
              ).map((e) => e);
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
      searchWidget.on("select-result", function (e) {
        return thisview.goTo({ center: new Point(e.result.feature.attributes), scale: 540 });
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
