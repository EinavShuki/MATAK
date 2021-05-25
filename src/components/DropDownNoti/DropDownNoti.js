import { IoIosNotifications } from "react-icons/io";

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

const DropDownNoti = ({ notifications }) => {
  const classes = useStyles();
  // const [notifications, setNotifications] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  //   const { currentUser } = useSelector(state => state.users);

  useEffect(() => {
    console.log(notifications, notifications.length);
  }, [notifications]);

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
        id={notifications.length !== 0 ? "notempty" : "notification-icon"}
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
        {notifications.length > 0 ? (
          notifications.map(noti => {
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

                    <ul style={{ listStyle: "none" }}>
                      <li style={{ fontWeight: "bold" }}>{noti.Sender_Name}</li>
                      <li>{noti.Notification_Text}</li>
                      <li>{noti.createdAt}</li>
                    </ul>
                  </MenuItem>
                </Link>
              );
          })
        ) : (
          <Link
            style={{
              textDecoration: "none",
              color: "black",
            }}
            to={`/notifications`}
          >
            {" "}
            <h5>
              There aren't
              <br /> new notifications
            </h5>
          </Link>
        )}
      </Menu>
    </>
  );
};

export default DropDownNoti;
