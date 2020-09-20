import "leaflet/dist/leaflet.css";
import "./styles.css";

import cities from "./cities.json";
import L from "leaflet";
import HeatmapOverlay from "heatmap.js/plugins/leaflet-heatmap";

const osmAttribution = () =>
  "<a href='https://www.openstreetmap.org/copyright'>© OpenStreetMap contributors</a>";

const baseLayer = L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    attribution: osmAttribution(),
    maxZoom: 18,
  }
);

const cfg = {
  // radius should be small ONLY if scaleRadius is true (or small radius is intended)
  // if scaleRadius is false it will be the constant radius used in pixels
  radius: 2,
  maxOpacity: 0.8,
  // scales the radius based on map zoom
  scaleRadius: true,
  // if set to false the heatmap uses the global maximum for colorization
  // if activated: uses the data maximum within the current map boundaries
  //   (there will always be a red spot with useLocalExtremas true)
  useLocalExtrema: true,
  // which field name in your data represents the latitude - default "lat"
  latField: "latitude",
  // which field name in your data represents the longitude - default "lng"
  lngField: "longitude",
  // which field name in your data represents the data value - default "value"
  valueField: "population",
};

const heatmapLayer = new HeatmapOverlay(cfg);

const map = new L.Map("map", {
  center: new L.LatLng(38, -97),
  zoom: 4,
  layers: [baseLayer, heatmapLayer],
});

heatmapLayer.setData({ data: cities });
