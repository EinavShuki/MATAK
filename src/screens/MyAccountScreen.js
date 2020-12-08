import React, { useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import { MdVpnKey, MdEmail, MdLocalPhone } from "react-icons/md";

function MyAccountScreen() {
  function enableChnage() {}
  return (
    <>
      <div className="container emp-profile">
        <form method="post">
          <div className="profile-img">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog"
              alt=""
            />
            <div className="file">
              Change Photo
              <input type="file" name="file" />
            </div>
            <div className="user-details">
              <h1 className="name">Einav Shpigel</h1>
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
        </form>
      </div>
    </>
  );
}

export default MyAccountScreen;
