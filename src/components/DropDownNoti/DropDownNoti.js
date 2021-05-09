import { IoIosNotifications } from "react-icons/io";
import { notifications } from "../../fakeNotifications";

import "./DropDownNoti.css";

import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, Menu, MenuItem } from "@material-ui/core";
import { Link } from "react-router-dom";
import axios from "axios";
import axiosConfig from "../../config/axiosConfig";

const useStyles = makeStyles(theme => ({
  avatar: {
    width: "40px",
    height: "40px",
  },
  icon: {
    marginRight: "1rem",
  },
}));

const DropDownNoti = () => {
  const classes = useStyles();
  const [notifications, setNotifications] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  //   const { currentUser } = useSelector(state => state.users);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const callNotifications = async () => {
      try {
        const { data } = await axiosConfig.get("/notification/read", {
          cancelToken: source.token,
        });
        // console.log(data.data);
        data.data.forEach(noti => {
          noti.createdAt = noti.createdAt.slice(0, 19);
          noti.createdAt = noti.createdAt.replace("T", " ");
        });
        setNotifications(data.data);
      } catch (err) {
        console.error("error:", err.message);
      }
    };
    callNotifications();
    return () => {
      source.cancel("Cleanup");
    };
  }, []);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Avatar
        className={classes.avatar}
        aria-controls="simple-menu-dd"
        aria-haspopup="true"
        onClick={handleClick}
        id="notification-icon"
      >
        <IoIosNotifications />
      </Avatar>

      <Menu
        id="simple-menu-dd"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {notifications.map(noti => {
          if (!noti.Read)
            return (
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to={`/notifications`}
                key={noti.createdAt + noti.Sender_Name}
              >
                <MenuItem>
                  <Avatar className="avatar_name" id="name_icon">
                    {noti.Sender_Name && noti.Sender_Name[0].toUpperCase()}
                  </Avatar>
                  <div id="dd_square">
                    <ul style={{ listStyle: "none" }}>
                      <li style={{ fontWeight: "bold" }}>{noti.Sender_Name}</li>
                      <li>{noti.Notification_Text}</li>
                      <li>{noti.createdAt}</li>
                    </ul>
                  </div>
                </MenuItem>
              </Link>
            );
        })}
      </Menu>
    </>
  );
};

export default DropDownNoti;
