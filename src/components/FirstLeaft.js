import React, { useEffect, useState } from "react";
import { Map, Marker, Popup, TileLayer,Tooltip } from "react-leaflet";

function FirstLeaft() {
  const [position, setPosition] = useState();

  //returns the latlng of the point we pressed on
  function getPosition(e) {
    setPosition(e.latlng);
    console.log(e.latlng);
  }
  return (
    <>
      <h1 className="map-title">My firsy map</h1>
      {/*center-where the map is loacted , zoom-what is the zoom out we are from the location
    the more zoom number is lower the more we get far from the location */}
      <Map onclick={getPosition} center={[31.96102, 34.80162]} zoom={10}>
        <TileLayer
          //correct attribution for osm
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
        />

        {position && (
          <Marker position={position}>
            <Popup>
              <div>
                <h3>{JSON.stringify(position, null, 2)}</h3>
              </div>
            </Popup>
          </Marker>
        )}
        <Tooltip>somthing</Tooltip>
      </Map>
    </>
  );
}

export default FirstLeaft;
