import React, { useState, useEffect } from "react";
import MatakIcon from "../images/matak.png";
import loadingGif from "../images/loading.gif";
import { FiMenu } from "react-icons/fi";
import { FaSatellite } from "react-icons/fa";

//components area
import MapComponent from "../components/MapComponent/MapComponent";
import SideMenu from "../components/SideMenu";
import StatusInfo from "../components/StatusInfo/StatusInfo";
import AvatarIcon from "../components/AvatarIcon";
import { CSSTransition } from "react-transition-group";
import { useSelector, useDispatch } from "react-redux";
import { Avatar } from "@material-ui/core";
import { MdRefresh } from "react-icons/md";
import useDispatchRoutes from "../customHooks/useDispatchRoutes";
import DropDownNoti from "../components/DropDownNoti/DropDownNotification";
import { toggleSatellite, turnOffIsHidden } from "../redux/userRoutes";
import axiosConfig from "../config/axiosConfig";
import { resetRoute } from "../redux/createdRoute";

function HomeScreen() {
  const [notifications, setNotifications] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    const timer = setInterval(() => {
      fetchRoutesData();
      callNotifications();
    }, 60000);
    return () => clearInterval(timer);
    // eslint-disable-next-line
  }, []);

  const [sideMenu, setSideMenu] = useState(false);

  const { currentUser } = useSelector(state => {
    return state.users;
  });

  const { loading, isSatellite } = useSelector(state => {
    return state.userRoutes;
  });
  const First_Name = currentUser?.First_Name;
  const { fetchRoutesData } = useDispatchRoutes();

  useEffect(() => {
    dispatch(turnOffIsHidden());
    dispatch(resetRoute());
    fetchRoutesData();
    callNotifications();
    // eslint-disable-next-line
  }, []);

  const callNotifications = async () => {
    try {
      const { data } = await axiosConfig.get("/notification/read");
      data.data.forEach(noti => {
        noti.createdAt = noti.createdAt.slice(0, 19);
        noti.createdAt = noti.createdAt.replace("T", " ");
      });
      setNotifications(data.data);
    } catch (err) {
      console.error("error:", err.message);
    }
  };

  const manualRefreash = () => {
    fetchRoutesData();
    callNotifications();
  };

  return (
    <>
      <FiMenu id="add-icon" onClick={() => setSideMenu(true)} />
      <img id="matak-icon" src={MatakIcon} alt="Matak-Icon" />

      <AvatarIcon letter={First_Name ? First_Name[0].toUpperCase() : "N/A"} />
      <Avatar
        id="refresh-icon"
        onClick={manualRefreash}
        src={loading ? loadingGif : ""}
      >
        <MdRefresh />
      </Avatar>

      <DropDownNoti notifications={notifications} />

      <Avatar
        id="satellite-icon"
        onClick={() => dispatch(toggleSatellite())}
        style={{ color: isSatellite ? "white" : "rgba(255,255,255,0.35)" }}
      >
        <FaSatellite />
      </Avatar>

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
