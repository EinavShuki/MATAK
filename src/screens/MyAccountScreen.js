import React, { useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import Avatar from "@material-ui/core/Avatar";

import NavBar from "../components/NavBar";
import { MdVpnKey, MdEmail, MdLocalPhone } from "react-icons/md";

function MyAccountScreen() {
  function enableChnage() {}
  return (
    <>
      <NavBar />
      <div className="frame">
        <div className="user-details">
          <h1 className="name">Einav Shpigel</h1>
          <Avatar className="avatar_name" >ES</Avatar>
          <h3 className="organization-name">
            here we put the organization name
          </h3>
          <List component="nav" aria-label="main mailbox folders">
            <ListItem button>
              <ListItemIcon>
                <MdEmail />
              </ListItemIcon>
              <ListItemText primary="User Email" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <MdLocalPhone />
              </ListItemIcon>
              <ListItemText primary="User Phone" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <MdVpnKey />
              </ListItemIcon>
              <ListItemText primary="Change password" />
            </ListItem>
          </List>
          {/* SHOULD BE ENABLED ONLY IF  chang password BUTTON WAS PRESSED*/}
          <div className="change-password">
            <TextField
              variant="outlined"
              margin="normal"
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="off"
              autoFocus
            />{" "}
            <TextField
              variant="outlined"
              type="password"
              margin="normal"
              id="confirm-password"
              label="Confirm Password"
              name="confirm-password"
              autoComplete="off"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default MyAccountScreen;
