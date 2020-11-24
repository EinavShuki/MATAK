import React from "react";
import { Polygon } from "react-leaflet";
function MapPolygon({ polyGon }) {
  return <Polygon color="red" positions={polyGon} />;
}

export default MapPolygon;
