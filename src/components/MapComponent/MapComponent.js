import React, { useEffect, useState } from "react";
import L, { polygon } from "leaflet";
import {
  Map,
  Marker,
  Popup,
  TileLayer,
  Tooltip,
  ZoomControl,
} from "react-leaflet";
import "./MapComponent.css";
import PolyLine from "./components/PolyLine";
import MapPolygon from "./components/MapPolygon";
//note:opacity: 0.2, pointerEvents: "none"

// sets marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

function MapComponent() {
  const [isLine, setIsLine] = useState(false);
  const [isPoly, setIsPoly] = useState(false);
  const [position, setPosition] = useState([]);
  const [polyLine, setpolyLine] = useState([]);
  const [polyGon, setpolyGon] = useState([]);
  //sets the latlng to position of the point we pressed on
  function getPosition(e) {
    if (isPoly) {
      setpolyGon((prev) => [...prev, e.latlng]);
    } else if (isLine) {
      setpolyLine((prev) => [...prev, e.latlng]);
    }
    setPosition((prev) => [...prev, e.latlng]);
  }
  //removes the mark we pressed on
  function removePosition(e) {
    const pos = e.latlng;
    setPosition(
      position.filter((item) => item.lat !== pos.lat && item.lng !== pos.lng)
    );
    setpolyLine(
      polyLine.filter((item) => item.lat !== pos.lat && item.lng !== pos.lng)
    );
    setpolyGon(
      polyGon.filter((item) => item.lat !== pos.lat && item.lng !== pos.lng)
    );
  }

  // //removes the last line we made
  // function deleteLast() {
  //   const len = polyLine.length;
  //   if (len > 1) {
  //     const pos = polyLine[len - 1];
  //     setpolyLine(
  //       polyLine.filter((item) => item.lat !== pos.lat && item.lng !== pos.lng)
  //     );
  //     setPosition(
  //       position.filter((item) => item.lat !== pos.lat && item.lng !== pos.lng)
  //     );
  //   }
  // }

  return (
    <>
      <button
        onClick={() => {
          setpolyLine([]);
          setPosition([]);
          setpolyGon([]);
        }}
        id="clear"
      >
        Clear all
      </button>
      <button
        onClick={() => {
          setIsPoly(false);
          setIsLine(true);
        }}
        id="create-line"
      >
        create Line
      </button>
      {/* <button onClick={deleteLast} id="delete-last-line">
        Delete last line
      </button> */}
      <button
        onClick={() => {
          setIsLine(false);
          setIsPoly(true);
        }}
        id="create-polygon"
      >
        create Polygon
      </button>
      {/*center-where the map is loacted , zoom-what is the zoom out we are from the location
    the more zoom number is lower the more we get far from the location */}
      <Map
        zoomControl={false}
        onclick={getPosition}
        center={[31.96193073350435, 34.8060607910156]}
        zoom={11}
      >
        <TileLayer
          //correct attribution for osm
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
        />
        <ZoomControl position="topright"></ZoomControl>
        {position &&
          position.map((pos, index) => {
            return (
              <Marker
                key={pos.lat + pos.lng + index}
                position={pos}
                onClick={removePosition}
                onmouseover={(e) => {
                  e.target.openPopup();
                }}
                onmouseout={(e) => {
                  e.target.closePopup();
                }}
              >
                <Popup closeOnClick={true}>
                  <div>
                    <h3>{JSON.stringify(pos, null, 2)}</h3>
                  </div>
                </Popup>
              </Marker>
            );
          })}

        {polyLine && <PolyLine polyLine={polyLine} />}
        {polyGon && <MapPolygon polyGon={polyGon} />}
      </Map>
    </>
  );
}

export default MapComponent;
