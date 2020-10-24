import React, { useState } from "react";
import L from "leaflet";
import { Map, Marker, Popup, TileLayer, ZoomControl } from "react-leaflet";
import "./MapComponent.css";
//note:opacity: 0.2, pointerEvents: "none"

// sets marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

function MapComponent() {
  const [position, setPosition] = useState();

  //returns the latlng of the point we pressed on
  function getPosition(e) {
    setPosition(e.latlng);
  }

  return (
    <Map
      zoomControl={false}
      onclick={getPosition}
      center={[31.477632, 34.511871]}
      zoom={11}
    >
      <TileLayer
        //correct attribution for osm
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
      />
      <ZoomControl position="topright"></ZoomControl>
      {position && (
        <Marker position={position}>
          <Popup>
            <div>hello</div>
          </Popup>
        </Marker>
      )}
    </Map>
  );
}

export default MapComponent;
