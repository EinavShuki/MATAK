import React, { useEffect, useState } from "react";
import { Map, Marker, Popup, TileLayer, Tooltip,Polyline} from "react-leaflet";


function FirstLeaft() {
  const [position, setPosition] = useState();
  const [line,setLine]=useState({
    from_lat: 32.03078166500877,
    from_long: 34.91118800517516,
    id: "123",
    to_lat: 32.03544120111271,
    to_long: 34.867294857250265,
  },)
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
      <Map
      
        onclick={getPosition}
        center={[31.96102, 34.80162]}
        zoom={10}
        provider
      >
        <TileLayer
          //correct attribution for osm
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
        />

        {position && (
          <Marker position={position} draggable={true} ondrag={getPosition}>
            <Popup>
              <div>
                <h3>{JSON.stringify(position, null, 2)}</h3>
              </div>
            </Popup>
            
          </Marker>
        )}
        <Tooltip>somthing</Tooltip>
       <Polyline  color='blue' positions={ [line.from_lat, line.from_long], [line.to_lat, line.to_long]} />
      </Map>
      
    </>
  );
}

export default FirstLeaft;
