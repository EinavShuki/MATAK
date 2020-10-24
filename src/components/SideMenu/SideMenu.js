import React from "react";
import "./SideMenu.css";
import { CgCloseO } from "react-icons/cg";
import { ImAppleinc } from "react-icons/im";
function SideMenu({ isOpen, closeSideMenu }) {
  return (
    <nav className={isOpen ? "nav-menu active" : "nav-menu"}>
      <div id="menu-div">
        <span id="close-button" onClick={() => closeSideMenu(false)}>
          <CgCloseO />
        </span>

        <ul style={{ listStyleType: "none" }}>
          <div onClick={() => closeSideMenu(false)} className="list-item">
            <ImAppleinc />
            <li>New Route Request</li>
          </div>

          <div onClick={() => closeSideMenu(false)} className="list-item">
            <ImAppleinc />
            <li>New Parmament Route</li>
          </div>

          <div onClick={() => closeSideMenu(false)} className="list-item">
            <ImAppleinc />
            <li>Show Reports</li>
          </div>
          <div onClick={() => closeSideMenu(false)} className="list-item">
            <ImAppleinc />
            <li>Routes History</li>
          </div>
          <div onClick={() => closeSideMenu(false)} className="list-item">
            <ImAppleinc />
            <li>Status</li>
          </div>
        </ul>
      </div>
    </nav>
  );
}

export default SideMenu;
