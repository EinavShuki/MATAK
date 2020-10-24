import React, { useState } from "react";
import MatakIcon from "../images/matak.png";
import { FiMenu } from "react-icons/fi";
import MapComponent from "../components/MapComponent/MapComponent";
import SideMenu from "../components/SideMenu";
function HomeScreen() {
  const [sideMenu, setsideMenu] = useState(false);
  return (
    <>
      <FiMenu id="add-icon" onClick={() => setsideMenu(true)} />
      <img id="matak-icon" src={MatakIcon} alt="Matak-Icon" />
      <SideMenu isOpen={sideMenu} closeSideMenu={setsideMenu} />
      <MapComponent />
    </>
  );
}

export default HomeScreen;
