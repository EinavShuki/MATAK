import React, { useState } from "react";
import MatakIcon from "../images/matak.png";
import { FiMenu } from "react-icons/fi";

//components area
import MapComponent from "../components/MapComponent/MapComponent";
import SideMenu from "../components/SideMenu";
import StatusInfo from "../components/StatusInfo/StatusInfo";
import AvatarIcon from "../components/AvatarIcon";
import { CSSTransition } from "react-transition-group";

function HomeScreen() {
  const [sideMenu, setsideMenu] = useState(false);
  return (
    <>
      <FiMenu id="add-icon" onClick={() => setsideMenu(true)} />
      <img id="matak-icon" src={MatakIcon} alt="Matak-Icon" />

      <AvatarIcon letter={"M"} />
      <CSSTransition
        in={sideMenu}
        timeout={230}
        classNames="menu-transition"
        unmountOnExit
      >
        <SideMenu closeSideMenu={setsideMenu} />
      </CSSTransition>

      <StatusInfo />
      <MapComponent />
    </>
  );
}

export default HomeScreen;
