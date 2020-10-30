import React, { useState } from "react";
import "./SideMenu.css";
import { CgCloseO } from "react-icons/cg";
import {
  OPTIONS_PAGE,
  ROUTE_DETAILS_PAGE,
} from "../../constants/pageConstants";
import Options from "./components/Options";
import RouteDetails from "./components/RouteDetails";

function SideMenu({ isOpen, closeSideMenu }) {
  const [page, setPage] = useState({
    open: OPTIONS_PAGE,
  });

  return (
    <div className={isOpen ? "frosted nav-menu active" : "frosted nav-menu"}>
      <span id="close-button" onClick={() => closeSideMenu(false)}>
        <CgCloseO />
      </span>
      <div id="menu-div">
        {page.open === OPTIONS_PAGE && <Options setPage={setPage} />}
        {page.open === ROUTE_DETAILS_PAGE && <RouteDetails />}
      </div>
    </div>
  );
}

export default SideMenu;
