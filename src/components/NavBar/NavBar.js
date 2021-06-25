import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { IoIosNotifications } from "react-icons/io";
import { FaSuitcase } from "react-icons/fa";
import { HiOutlineHome } from "react-icons/hi";
import { MdSettings } from "react-icons/md";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const { currentUser } = useSelector(state => state.users);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link
              style={{ color: "white", textTransform: "capitalize" }}
              to="/my-account"
            >
              {currentUser.First_Name}
            </Link>
          </Typography>

          <Tooltip title="Notifications" placement="botton">
            <Link style={{ color: "white" }} to="/notifications">
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
              >
                <IoIosNotifications />
              </IconButton>
            </Link>
          </Tooltip>

          {currentUser.User_Type === "Admin" && (
            <Tooltip title="Admin Panel" placement="botton">
              <Link style={{ color: "white" }} to={`/admin-panel`}>
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="menu"
                >
                  <MdSettings />
                </IconButton>
              </Link>
            </Tooltip>
          )}

          <Tooltip title="Routes Management" placement="botton">
            <Link style={{ color: "white" }} to="/routes-management">
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
              >
                <FaSuitcase />
              </IconButton>
            </Link>
          </Tooltip>

          <Link style={{ color: "white" }} to={`/home`}>
            <Button style={{ fontSize: "1rem" }} color="inherit">
              Home
              <HiOutlineHome
                style={{ marginLeft: "0.5rem", fontSize: "1.5rem" }}
              />
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
