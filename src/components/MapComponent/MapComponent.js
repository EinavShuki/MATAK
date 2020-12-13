import React from "react";
import L from "leaflet";
import {
  Map,
  Marker,
  Popup,
  TileLayer,
  Tooltip,
  Polygon,
  Polyline,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./MapComponent.css";
import { STATUSES } from "../../constants/statusConstants";

//note:opacity: 0.2, pointerEvents: "none"
import { useDispatch, useSelector } from "react-redux";
import { addPosition, removePosition } from "../../actions/routeDetailsActions";

// sets marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

function MapComponent() {
  const dispatch = useDispatch();

  const routeDetails = useSelector((state) => {
    return state.routeDetails;
  });

  const handleMapClick = (e) => {
    const pos = e.latlng;
    dispatch(addPosition(pos));
  };

  const handleRemovePosition = (e) => {
    const pos = e.latlng;
    dispatch(removePosition(pos));
  };

  return (
    <>
      <Map
        zoomControl={false}
        onclick={handleMapClick}
        center={[31.477632, 34.511871]}
        zoom={10.5}
      >
        <TileLayer
          //correct attribution for osm
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
        />
        <ZoomControl position="topright"></ZoomControl>
        {routeDetails.positions &&
          routeDetails.positions.map((pos, index) => {
            return (
              <Marker
                key={pos.lat + pos.lng + index}
                position={pos}
                onClick={handleRemovePosition}
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

        {routeDetails.routeType === "POLYLINE" && (
          <Polyline
            color={STATUSES.submmited.color}
            positions={routeDetails.positions}
          />
        )}
        {routeDetails.routeType === "POLYGONE" && (
          <Polygon
            color={STATUSES.submmited.color}
            positions={routeDetails.positions}
          />
        )}
      </Map>
    </>
  );
}

export default MapComponent;
