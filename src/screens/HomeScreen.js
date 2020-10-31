//context area
import StateContext from "../components/MapContext/StateContext";
import DispatchContext from "../components/MapContext/DispatchContext";

import React, { useState, useContext } from "react";
import { useImmerReducer } from "use-immer";
import MatakIcon from "../images/matak.png";
import { FiMenu } from "react-icons/fi";

//components area
import MapComponent from "../components/MapComponent/MapComponent";
import SideMenu from "../components/SideMenu";

function HomeScreen() {
  const initialState = {
    isLine: false,
    isPoly: false,
    position: [],
    polyLine: [],
    polyGon: [],
  };

  function ourReducer(draft, action) {
    switch (action.type) {
      case "isLineOn":
        draft.isLine = true;
        return;
      case "isLineOff":
        draft.isLine = false;
        return;
      case "isPolyOn":
        draft.isPoly = true;
        return;
      case "isPolyOff":
        draft.isPoly = false;
        return;
      case "position":
        draft.position.push(action.value);
        return;
      case "position-trans":
        draft.position = action.value;
        return;
      case "polyLine":
        draft.polyLine.push(action.value);
        return;
      case "polyLine-trans":
        draft.polyLine = action.value;
        return;
      case "polyGon":
        draft.polyGon.push(action.value);
        return;
      case "polyGon-trans":
        draft.polyGon = action.value;
        return;
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState);
  const [sideMenu, setsideMenu] = useState(false);
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <FiMenu id="add-icon" onClick={() => setsideMenu(true)} />
        <img id="matak-icon" src={MatakIcon} alt="Matak-Icon" />
        {/* {sideMenu && <SideMenu isOpen={sideMenu} closeSideMenu={setsideMenu} />} */}
        <SideMenu isOpen={sideMenu} closeSideMenu={setsideMenu} />
        <MapComponent />
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export default HomeScreen;
