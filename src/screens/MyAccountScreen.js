import React from "react";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";

import Avatar from "@material-ui/core/Avatar";

import NavBar from "../components/NavBar";
import { MdVpnKey, MdEmail, MdLocalPhone } from "react-icons/md";
import { Button } from "@material-ui/core";

function MyAccountScreen() {
  return (
    <>
      <NavBar />
      <div className="frame">
        <h1 className="name">Einav Shpigel</h1>
        <Avatar className="avatar_name">ES</Avatar>
        <h3 className="organization-name" style={{ marginLeft: "6rem" }}>
          here we put the organization name
        </h3>
        <div className="details">
          <List
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "0 2rem",
            }}
          >
            <ListItem>
              <ListItemIcon>
                <MdEmail />
              </ListItemIcon>
              <TextField
                fullWidth
                id="standard-basic"
                margin="dense"
                name="Mail"
                label="User Email"
                type="email"
                autoComplete="off"
                autoFocus
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <MdLocalPhone />
              </ListItemIcon>
              <TextField
                fullWidth
                id="standard-basic"
                margin="normal"
                name="Mail"
                label="User Phone"
                type="tel"
                autoComplete="off"
                autoFocus
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <MdVpnKey />
              </ListItemIcon>
              <TextField
                fullWidth
                id="standard-basic"
                margin="normal"
                name="Mail"
                label="Password"
                type="password"
                autoComplete="off"
                autoFocus
              />
            </ListItem>
            <ListItem>
              <ListItemIcon> </ListItemIcon>
              <TextField
                fullWidth
                id="standard-basic"
                margin="normal"
                name="Mail"
                label="Confirm Password"
                type="password"
                autoComplete="off"
                autoFocus
              />{" "}
            </ListItem>
          </List>
          <Button
            variant="contained"
            color="primary"
            style={{
              alignSelf: "center",
              width: "60%",
              padding: "0.5rem 0.5rem",
              marginLeft: "6.3rem",
              marginTop: "1rem",
            }}
          >
            Submit
          </Button>
        </div>
      </div>
    </>
  );
}

export default MyAccountScreen;
