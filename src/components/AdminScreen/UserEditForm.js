import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ActionButtons from "./ActionButtons";
import {
  MdEmail,
  MdLocalPhone,
  MdAccountCircle,
  MdCardTravel,
  MdPieChart,
} from "react-icons/md";
import { InputAdornment } from "@material-ui/core";

function UserEditForm({ user, onFormSubmit, onCancel }) {
  const [userDetails, setUserDetails] = useState(user);

  const handleChange = ({ target }) => {
    setUserDetails((prevUser) => ({
      ...prevUser,
      [target.name]: target.value,
    }));
  };

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
            name="firstName"
            label="First Name"
            type="text"
            autoComplete="off"
            autoFocus
            onChange={handleChange}
            value={userDetails.firstName}
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
            name="lastName"
            label="Last Name"
            type="text"
            autoComplete="off"
            autoFocus
            onChange={handleChange}
            value={userDetails.lastName}
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
            name="email"
            label="User Email"
            type="email"
            autoComplete="off"
            autoFocus
            onChange={handleChange}
            value={userDetails.email}
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
            name="mobile"
            label="Mobile"
            type="tel"
            autoComplete="off"
            autoFocus
            onChange={handleChange}
            value={userDetails.mobile}
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
            onChange={handleChange}
            value={userDetails.organization}
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
            onChange={handleChange}
            value={userDetails.usertype}
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
      <ActionButtons
        onOk={() => onFormSubmit(userDetails)}
        onCancel={onCancel}
      />
    </form>
  );
}

export default UserEditForm;
