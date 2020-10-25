import React, { useState } from "react";
import MatakIcon from "../images/matak.png";
import { FiMenu } from "react-icons/fi";
import MapComponent from "../components/MapComponent/MapComponent";
import SideMenu from "../components/SideMenu";
function HomeScreen() {
  const initialState={
    loggedIn:Boolean(localStorage.getItem("complexappToken")),
    flashMesseges: []
  }
  
  function ourReducer(state,action)
  {
    switch(action.type){
      case "Login":
       return {loggedIn:true,flashMesseges: state.flashMesseges}
      case "Logout":
       return {loggedIn:false,flashMesseges: state.flashMesseges}
      case " flashMesseges ":
       return {loggedIn:state.loggedIn,flashMesseges: state.flashMesseges.concat(action.value)}
    }
  }
  
  const [state,dispatch]=useReducer(ourReducer,initialState);  
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
