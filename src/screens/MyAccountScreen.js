import React from "react";

import {
  FormControl,
  ListItem,
  List,
  TextField,
  Avatar,
  Button,
  InputAdornment,
} from "@material-ui/core";
import { UpdateUser } from "../redux/users";
import { useDispatch, useSelector } from "react-redux";

import MatakIcon from "../images/matak.png";

import NavBar from "../components/NavBar";
import { MdVpnKey, MdEmail, MdLocalPhone } from "react-icons/md";

function MyAccountScreen() {
  const dispatch = useDispatch();

  // const updateHandler = () => {
  //   dispatch(UpdateUser(currentUser.email, currentUser.phone));
  // };

  //taking current user's details
  const { currentUser } = useSelector(state => state.users);

  return (
    <>
      <NavBar />
      <div className="frame">
        <h1
          // value={currentUser.name}
          className="name"
        >
          Einav Shpigel
        </h1>
        <Avatar className="avatar_name">ES</Avatar>
        <h3 className="organization-name" style={{ marginLeft: "6rem" }}>
          here we put the organization name
        </h3>

        <List
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "0 2rem",
          }}
        >
          <ListItem>
            <TextField
              fullWidth
              margin="dense"
              name="Mail"
              label="User Email"
              type="email"
              autoComplete="off"
              autoFocus
              // value={currentUser.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MdEmail />
                  </InputAdornment>
                ),
              }}
            />
          </ListItem>
          <ListItem>
            <TextField
              fullWidth
              margin="normal"
              name="Phone"
              label="User Phone"
              type="tel"
              // value={currentUser.phone}
              autoComplete="off"
              autoFocus
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MdLocalPhone />
                  </InputAdornment>
                ),
              }}
            />
          </ListItem>
          <ListItem>
            <TextField
              fullWidth
              margin="normal"
              name="password"
              label="Password"
              type="password"
              autoComplete="off"
              autoFocus
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MdVpnKey />
                  </InputAdornment>
                ),
              }}
            />
          </ListItem>
          <ListItem>
            <TextField
              fullWidth
              margin="normal"
              name="confirm-password"
              label="Confirm Password"
              type="password"
              autoComplete="off"
              autoFocus
            />
          </ListItem>
          <Button
            variant="contained"
            color="primary"
            style={{
              marginTop: "1rem",
              width: "100%",
              padding: "0.5rem 0",
            }}
          >
            Submit
          </Button>
        </List>
        <img id="matak-icon" src={MatakIcon} alt="Matak-Icon" />
      </div>
    </>
  );
}

export default MyAccountScreen;
