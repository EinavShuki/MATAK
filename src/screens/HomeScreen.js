import React, { useState, useEffect } from "react";
import MatakIcon from "../images/matak.png";
import { FiMenu } from "react-icons/fi";

//components area
import MapComponent from "../components/MapComponent/MapComponent";
import SideMenu from "../components/SideMenu";
import StatusInfo from "../components/StatusInfo/StatusInfo";
import AvatarIcon from "../components/AvatarIcon";
import { CSSTransition } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoutes } from "../redux/userRoutes";

function HomeScreen() {
  const [sideMenu, setSideMenu] = useState(false);
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => {
    return state.users;
  });
  const First_Name = currentUser?.First_Name;

  useEffect(() => {
    dispatch(fetchRoutes());
  }, [dispatch]);

  return (
    <>
      <FiMenu id="add-icon" onClick={() => setSideMenu(true)} />
      <img id="matak-icon" src={MatakIcon} alt="Matak-Icon" />

      <AvatarIcon letter={First_Name ? First_Name[0].toUpperCase() : "M"} />
      <CSSTransition
        in={sideMenu}
        timeout={230}
        classNames="menu-transition"
        unmountOnExit
      >
        <SideMenu setSideMenu={setSideMenu} />
      </CSSTransition>

      <StatusInfo />
      <MapComponent setMainSideMenu={setSideMenu} />
    </>
  );
}

export default HomeScreen;
