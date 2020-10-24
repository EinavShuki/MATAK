import React, { useEffect } from "react";
import { Circle,Popup } from "react-leaflet";

function MapCircle(props) {
  
  return (
      <Circle center={props.info} radius={400}>
        <Popup>
          <div>
            <h3>{JSON.stringify(props.info, null, 2)}</h3>
          </div>
        </Popup>
      </Circle>
   
  );
}

export default MapCircle;
