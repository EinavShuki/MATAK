import { IoIosNotifications } from "react-icons/io";
import { notifications } from "../../fakeNotifications";

import "./DropDownNoti.css";

import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, Menu, MenuItem } from "@material-ui/core";
import { MdPowerSettingsNew, MdSettings } from "react-icons/md";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

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
  const [anchorEl, setAnchorEl] = useState(null);
  //   const { currentUser } = useSelector(state => state.users);

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
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        id="notification-icon"
      >
        <IoIosNotifications />
      </Avatar>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {notifications.map(noti => {
          if (!noti.isRead)
            return (
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to={`/notifications`}
              >
                <MenuItem>
                  <Avatar
                    className="avatar_name"
                    style={{
                      width: "25px",
                      height: "25px",
                      fontSize: "0.875rem",
                    }}
                  >
                    SE
                  </Avatar>
                  <div
                    style={{
                      width: "500px",
                      height: "100px",
                      overflow: "scroll",
                    }}
                  >
                    <ul style={{ listStyle: "none" }}>
                      <li style={{ fontWeight: "bold" }}>{noti.sender}</li>
                      <li>Notes: {noti.notes}</li>
                      <li>type: {noti.type}</li>
                      <li>Route Detaile: {noti.routeDetails}</li>
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
