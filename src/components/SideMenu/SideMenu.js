import React, { useState } from "react";
import "./SideMenu.css";
import { CgCloseO } from "react-icons/cg";
import {
  OPTIONS_PAGE,
  ROUTE_DETAILS_PAGE,
  REPORTING_PAGE,
} from "../../constants/pageConstants";

//INITIAL COMPONENTS
import Options from "./components/Options";
import RouteDetails from "./components/RouteDetails";
import Reporting from "./components/Options";

function SideMenu({ isOpen, closeSideMenu }) {
  const [page, setPage] = useState({
    open: OPTIONS_PAGE,
  });

  return (
    <div className={isOpen ? "frosted nav-menu active" : "frosted nav-menu"}>
      <span id="close-button" onClick={() => closeSideMenu(false)}>
        <CgCloseO />
      </span>
      <div
        id="menu-div"
        className={page.open === OPTIONS_PAGE ? "align-center" : "add-padding"}
      >
        {page.open === OPTIONS_PAGE && <Options setPage={setPage} />}
        {page.open === ROUTE_DETAILS_PAGE && <RouteDetails />}
        {page.open === REPORTING_PAGE && <Reporting />}
      </div>
    </div>
  );
}

export default SideMenu;
