import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import Avatar from "@material-ui/core/Avatar";

import NavBar from "../components/NavBar";
import { MdVpnKey, MdEmail, MdLocalPhone } from "react-icons/md";
import { Button } from "@material-ui/core";

function MyAccountScreen() {
  const [selctedPhone, setSelctedPhone] = useState(false);
  const [selctedMail, setSelctedMail] = useState(false);
  const [selctedPassword, setSelctedPassword] = useState(false);
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
          <List component="nav" aria-label="main mailbox folders">
            {selctedMail ? (
              <ListItem
                input
                onFocus={() => {
                  setSelctedPhone(false);
                  setSelctedPassword(false);
                }}
              >
                <TextField
                  id="standard-basic"
                  label="Standard"
                  margin="normal"
                  name="Mail"
                  label="User Email"
                  type="email"
                  autoComplete="off"
                  autoFocus
                />
                <Button
                  variant="contained"
                  color="primary"
                  style={{
                    alignSelf: "flex-end",
                    padding: "0.5rem 0.5rem",
                    margin: "0.5rem 0.5rem",
                  }}
                  onClick={() => setSelctedMail(false)}
                >
                  Done
                </Button>
              </ListItem>
            ) : (
              <ListItem button onClick={() => setSelctedMail(true)}>
                <ListItemIcon>
                  <MdEmail />
                </ListItemIcon>
                <ListItemText primary="User Email" />
              </ListItem>
            )}

            {!selctedPhone ? (
              <ListItem button onClick={() => setSelctedPhone(true)}>
                <ListItemIcon>
                  <MdLocalPhone />
                </ListItemIcon>
                <ListItemText primary="User Phone" />
              </ListItem>
            ) : (
              <ListItem
                input
                onFocus={() => {
                  setSelctedMail(false);
                  setSelctedPassword(false);
                }}
              >
                <TextField
                  id="standard-basic"
                  label="Standard"
                  margin="normal"
                  name="Mail"
                  label="User Phone"
                  type="tel"
                  autoComplete="off"
                  autoFocus
                />
                <Button
                  variant="contained"
                  color="primary"
                  style={{
                    alignSelf: "flex-end",
                    padding: "0.5rem 0.5rem",
                    margin: "0.5rem 0.5rem",
                  }}
                  onClick={() => setSelctedPhone(false)}
                >
                  Done
                </Button>
              </ListItem>
            )}
            {!selctedPassword ? (
              <ListItem button onClick={() => setSelctedPassword(true)}>
                <ListItemIcon>
                  <MdVpnKey />
                </ListItemIcon>
                <ListItemText primary="Change Password" />
              </ListItem>
            ) : (
              <ListItem
                input
                onFocus={() => {
                  setSelctedPhone(false);
                  setSelctedMail(false);
                }}
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  marginLeft: "inherit",
                }}
              >
                <TextField
                  id="standard-basic"
                  label="Standard"
                  margin="normal"
                  name="Mail"
                  label="Password"
                  type="password"
                  autoComplete="off"
                  autoFocus
                />
                {"  "}
                <TextField
                  id="standard-basic"
                  label="Standard"
                  margin="normal"
                  name="Mail"
                  label="Confirm Password"
                  type="password"
                  autoComplete="off"
                  autoFocus
                />{" "}
                <Button
                  variant="contained"
                  color="primary"
                  style={{
                    alignSelf: "flex-end",
                    padding: "0.5rem 0.5rem",
                    margin: "0.5rem 0.5rem",
                  }}
                  onClick={() => setSelctedPassword(false)}
                >
                  Done
                </Button>
              </ListItem>
            )}
          </List>
        </div>
      </div>
    </>
  );
}

export default MyAccountScreen;
