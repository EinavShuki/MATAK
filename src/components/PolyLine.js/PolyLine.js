import React, { useEffect } from "react";
import { Polyline } from "react-leaflet";

function PolyLine({ polyLine }) {
  return <>{polyLine && <Polyline color="blue" positions={polyLine} />}</>;
}

export default PolyLine;
