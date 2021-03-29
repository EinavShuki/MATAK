import React, { useEffect, useRef } from "react";

import {
  FormControl,
  ListItem,
  List,
  TextField,
  Avatar,
  Button,
  InputAdornment,
} from "@material-ui/core";
import { UpdateUser, fetchCurrentUser } from "../redux/users";
import { useDispatch, useSelector } from "react-redux";

import MatakIcon from "../images/matak.png";

import NavBar from "../components/NavBar";
import { MdVpnKey, MdEmail, MdLocalPhone } from "react-icons/md";

function MyAccountScreen() {
  const dispatch = useDispatch();
  const emailRef = useRef();
  const phoneRef = useRef();

  const updateHandler = () => {
    // dispatch(UpdateUser(emailRef, phoneRef));
  };

  //taking current user's details
  const { currentUser } = useSelector(state => state.users);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <>
      <NavBar />
      {currentUser && (
        <div className="my_account_screen">
          <div className="frame">
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Avatar className="avatar_name">ES</Avatar>
              <h1 value={currentUser.name} className="name">
                Einav Shpigel
              </h1>
            </span>
            <h3 className="organization-name">
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
                  ref={emailRef}
                  fullWidth
                  margin="dense"
                  name="Mail"
                  label="User Email"
                  type="email"
                  autoComplete="off"
                  autoFocus
                  value={currentUser.email}
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
                  ref={phoneRef}
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
              <Button
                onClick={updateHandler()}
                variant="contained"
                color="primary"
                style={{
                  alignSelf: "center",
                  marginTop: "1rem",
                  width: "90%",
                  padding: "0.5rem 0.5rem",
                }}
              >
                Update
              </Button>
            </List>
          </div>
        </div>
      )}
    </>
  );
}

export default MyAccountScreen;
