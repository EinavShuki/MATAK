import React, { useState } from "react";
import L from "leaflet";
import {
  Map,
  Marker,
  TileLayer,
  Polygon,
  Polyline,
  ZoomControl,
  GeoJSON,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./MapComponent.css";
import { STATUSES } from "../../constants/statusConstants";

//note:opacity: 0.2, pointerEvents: "none"
import { useDispatch, useSelector } from "react-redux";

import { addPositionToCurrent } from "../../redux/createdRoute";
import { CSSTransition } from "react-transition-group";
import SideMenu from "../SideMenu";

import axiosConfig from "../../config/axiosConfig";

// sets marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

function MapComponent({ setMainSideMenu }) {
  const [routeDetailsMenu, setRouteDetailsMenu] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);

  const dispatch = useDispatch();
  const { currentCreatedRoute, isEditAvailable } = useSelector(state => {
    return state.createdRoute;
  });

  const { routes, isHidden } = useSelector(state => {
    return state.userRoutes;
  });

  const handleMapClick = e => {
    if (isEditAvailable) {
      const pos = e.latlng;
      const { lat, lng } = pos;
      dispatch(addPositionToCurrent({ lat, lng }));
    }
  };

  const whenClicked = async route => {
    setRouteDetailsMenu(false);
    setMainSideMenu(false);

    const send = {
      _id: route.properties._id,
    };

    const { data } = await axiosConfig.post("/path/get", send, {withCredentials: true});

    setSelectedRoute(data.data[0]);
    setRouteDetailsMenu(true);
  };

  const handleClickOnRoute = (route, layer) => {
    layer.on({
      click: () => whenClicked(route),
    });
  };

  const renderRoutes = () => {
    const filteredRoutes = currentCreatedRoute.filter(route => {
      if (route.routeType && route.positions.length) {
        return route;
      }
    });
    const routesToRender = filteredRoutes.map((route, index) => {
      switch (route.routeType) {
        case "Point":
          return <Marker key={index} position={route.positions[0]} />;
        case "LineString":
          return (
            <Polyline
              key={index}
              color={STATUSES.BeingCreated.color}
              positions={[route.positions]}
            />
          );
        case "Polygon":
          return (
            <Polygon
              key={index}
              color={STATUSES.BeingCreated.color}
              positions={[route.positions]}
            />
          );
        default:
          return;
      }
    });

    return routesToRender;
  };

  return (
    <>
      <CSSTransition
        in={routeDetailsMenu}
        timeout={200}
        classNames="menu-transition"
        unmountOnExit
      >
        <SideMenu
          setSideMenu={setRouteDetailsMenu}
          selectedRoute={selectedRoute}
        />
      </CSSTransition>

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
        <ZoomControl position="topright" />

        {!isHidden &&
          routes.map((route, i) => {
            return (
              <GeoJSON
                color={STATUSES[route["Status_Name"]]?.color}
                key={i}
                data={route["Array_Of_Points"]}
                onEachFeature={handleClickOnRoute}
              />
            );
          })}
        {renderRoutes()}

        {/* {routeDetails.positions &&
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
          })} */}

        {/* 
        {routeDetails.map((kindOfRoute, index) => {
          if (
            kindOfRoute.routeType === "Point" &&
            kindOfRoute.positions.length
          ) {
            return (
              <Marker index={index} position={kindOfRoute.positions[0]}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            );
          } else if (
            kindOfRoute.positions.length &&
            kindOfRoute.routeType === "LineString"
          ) {
            console.log("object");
            return (
              <Polyline
                index={index}
                color={STATUSES.submmited.color}
                positions={kindOfRoute.positions}
              />
            );
          } else if (
            kindOfRoute.positions.length &&
            kindOfRoute.routeType === "Polygon"
          ) {
            return (
              <Polygon
                index={index}
                color={STATUSES.submmited.color}
                positions={kindOfRoute.positions}
              />
            );
          }
        })} */}

        {/* {routeDetails.routeType === "Point" && routeDetails.positions && (
          <Marker
            position={[
              routeDetails.positions[0].lat,
              routeDetails.positions[0].lng,
            ]}
          >
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        )}

        {routeDetails.routeType === "LineString" && (
          <Polyline
            color={STATUSES.submmited.color}
            positions={routeDetails.positions}
          />
        )}
        {routeDetails.routeType === "Polygon" && (
          <Polygon
            color={STATUSES.submmited.color}
            positions={routeDetails.positions}
          />
        )} */}
      </Map>
    </>
  );
}

export default MapComponent;
