import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { FiMenu } from "react-icons/fi";
import { IoIosNotifications } from "react-icons/io";
import { HiOutlineHome } from "react-icons/hi";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
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

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <FiMenu />
          </IconButton>
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
          <Typography variant="h6" className={classes.title}>
            Einav
          </Typography>
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
