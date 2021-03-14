import React from "react";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { MdVpnKey, MdEmail, MdLocalPhone, MdAccountCircle, MdCardTravel, MdPieChart } from "react-icons/md";
import {InputAdornment } from "@material-ui/core";

function UserEditForm({
  user: { id, firstName, lastName, email, mobile, organization, usertype },
}) {
  return (
    <form>
      <List
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "1rem 0 3rem 0",
        }}
      >
        <ListItem>
          <TextField
            fullWidth
            margin="dense"
            name="FirstName"
            label="First Name"
            type="text"
            autoComplete="off"
            autoFocus
            value={firstName}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MdAccountCircle />
                </InputAdornment>
              ),
            }}
          />
        </ListItem>
        <ListItem>
          <TextField
            fullWidth
            margin="dense"
            name="LastName"
            label="Last Name"
            type="text"
            autoComplete="off"
            autoFocus
            value={lastName}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MdAccountCircle />
                </InputAdornment>
              ),
            }}
          />
        </ListItem>
        <ListItem>
          <TextField
            fullWidth
            margin="dense"
            name="Mail"
            label="User Email"
            type="email"
            autoComplete="off"
            autoFocus
            value={email}
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
            name="Mobile"
            label="Mobile"
            type="tel"
            autoComplete="off"
            autoFocus
            value={mobile}
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
            name="organization"
            label="Organization"
            type="text"
            autoComplete="off"
            autoFocus
            value={organization}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MdCardTravel />
                </InputAdornment>
              ),
            }}
          />
        </ListItem>
        <ListItem>
          <TextField
            fullWidth
            margin="normal"
            name="usertype"
            label="User Type"
            type="text"
            autoComplete="off"
            autoFocus
            value={usertype}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MdPieChart />
                </InputAdornment>
              ),
            }}
          />
        </ListItem>
      </List>
    </form>
  );
}

export default UserEditForm;
