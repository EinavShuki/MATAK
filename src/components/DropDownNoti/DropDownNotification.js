import { IoIosNotifications } from "react-icons/io";
import React, { useState, useMemo } from "react";
import Avatar from "@material-ui/core/Avatar";
import { Menu, MenuItem } from "@material-ui/core";
import { Link } from "react-router-dom";

const DropDownNotification = ({ notifications }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const unreadNotifications = useMemo(
    () => notifications.filter(notification => !notification.Read),
    [notifications]
  );

  return (
    <>
      <Avatar
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
          unreadNotifications.map((notification, index) => (
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to={`/notifications`}
              key={notification.createdAt + notification.Sender_Name + index}
            >
              <MenuItem>
                <Avatar className="avatar_name" id="name_icon">
                  {notification.Sender_Name &&
                    notification.Sender_Name[0].toUpperCase()}
                </Avatar>

                <ul style={{ listStyle: "none", padding: "0 20px" }}>
                  <li style={{ fontWeight: "bold" }}>
                    {notification.Sender_Name}
                  </li>
                  <li>{notification.Notification_Text}</li>
                  <li>{notification.createdAt}</li>
                </ul>
              </MenuItem>
            </Link>
          ))
        ) : (
          <Link to={`/notifications`}>
            <MenuItem>
              <h5>No New Notifications</h5>
            </MenuItem>
          </Link>
        )}
      </Menu>
    </>
  );
};

export default DropDownNotification;
