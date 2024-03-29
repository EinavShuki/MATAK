import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import "./AvatarIcon.css";
import { makeStyles, Menu, MenuItem } from "@material-ui/core";
import {
  MdPowerSettingsNew,
  MdSettings,
  MdAccountCircle,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const useStyles = makeStyles(theme => ({
  avatar: {
    position: "fixed",
    zIndex: "5003",
    right: "70px",
    top: "20px",
  },
  icon: {
    marginRight: "1rem",
  },
}));

function AvatarIcon({ letter }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const { currentUser } = useSelector(state => state.users);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      // Here should be logout post request
      // await axiosConfig.post("/logout");
        window.location.reload(false);
    } catch (e) {
        console.log(e);
    }
  };
  return (
    <>
      <Avatar
        className={classes.avatar}
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        id="avatar-icon"
      >
        {letter}
      </Avatar>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link to={`/my-account`}>
          <MenuItem>
            <MdAccountCircle className={classes.icon} />
            My Account
          </MenuItem>
        </Link>
        {currentUser.User_Type === "Admin" && (
          <Link to={`/admin-panel`}>
            <MenuItem>
              <MdSettings className={classes.icon} />
              Admin Panel
            </MenuItem>
          </Link>
        )}

        <MenuItem onClick={handleLogout}>
          <MdPowerSettingsNew className={classes.icon} />
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}

export default AvatarIcon;
