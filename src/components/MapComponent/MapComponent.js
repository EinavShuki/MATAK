import React, { useContext} from "react";
import L, { polygon } from "leaflet";
import {
  Map,
  Marker,
  Popup,
  TileLayer,
  Tooltip,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./MapComponent.css";
import PolyLine from "./components/PolyLine";
import MapPolygon from "./components/MapPolygon";
//note:opacity: 0.2, pointerEvents: "none"
import DispatchContext from "../MapContext/DispatchContext";
import StateContext from "../MapContext/StateContext";

// sets marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

function MapComponent() {
  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);

  //sets the latlng to position of the point we pressed on
  function getPosition(e) {
    if (appState.isPoly) {
      appDispatch({
        type: "polyGon",
        value: e.latlng,
      });
    } else if (appState.isLine) {
      appDispatch({
        type: "polyLine",
        value: e.latlng,
      });
    }
    appDispatch({
      type: "position",
      value: e.latlng,
    });
  }
  //removes the mark we pressed on
  function removePosition(e) {
    const pos = e.latlng;
    appDispatch({
      type: "position-trans",
      value: appState.position.filter(
        (item) => item.lat !== pos.lat && item.lng !== pos.lng
      ),
    });
    appDispatch({
      type: "polyLine-trans",
      value: appState.polyLine.filter(
        (item) => item.lat !== pos.lat && item.lng !== pos.lng
      ),
    });
    appDispatch({
      type: "polyGon-trans",
      value: appState.polyGon.filter(
        (item) => item.lat !== pos.lat && item.lng !== pos.lng
      ),
    });
  }

  return (
    <>
      <button
        onClick={() => {
          appDispatch({
            type: "polyGon-trans",
            value: [],
          });
          appDispatch({
            type: "polyLine-trans",
            value: [],
          });
          appDispatch({
            type: "position-trans",
            value: [],
          });
        }}
        id="clear"
      >
        Clear all
      </button>
      <button
        onClick={() => {
          appDispatch({ type: "isPolyOff" });
          appDispatch({ type: "isLineOn" });
        }}
        id="create-line"
      >
        create Line
      </button>

      <button
        onClick={() => {
          appDispatch({ type: "isPolyOn" });
          appDispatch({ type: "isLineOff" });
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
        center={[31.477632, 34.511871]}
        zoom={10}
      >
        <TileLayer
          //correct attribution for osm
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
        />
        <ZoomControl position="topright"></ZoomControl>
        {appState.position &&
          appState.position.map((pos, index) => {
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

        {appState.polyLine && <PolyLine polyLine={appState.polyLine} />}
        {appState.polyGon && <MapPolygon polyGon={appState.polyGon} />}
      </Map>
    </>
  );
}

export default MapComponent;
