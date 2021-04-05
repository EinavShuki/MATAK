import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { FaLock } from "react-icons/fa";
import DateFnsUtils from "@date-io/date-fns";

import React, { useMemo, useState } from "react";
import { STATUSES } from "../../../constants/statusConstants";

import axiosConfig from "../../../config/axiosConfig";
import useDispatchRoutes from "../../../customHooks/useDispatchRoutes";
const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

function ViewAndChange({ selectedRoute, setSideMenu }) {
  const {
    Remarks,
    Reason_Text,
    Is_Permanent,
    Status_Name,
    Path_Name,
    _id,
    Start_Date,
    End_Date,
  } = selectedRoute;

  const { fetchRoutesData } = useDispatchRoutes();
  const [status, setStatus] = useState(Status_Name);

  const [startingDate, setStartingDate] = useState(
    new Date(Start_Date ? Start_Date : null)
  );
  const [endingDate, setEndingDate] = useState(
    new Date(End_Date ? End_Date : null)
  );

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  const statusesArray = useMemo(() => {
    return Object.values(STATUSES).filter(status => {
      if (
        status.name !== STATUSES.BeingCreated.name &&
        status.name !== STATUSES.Permanent.name
      ) {
        return status;
      }
    });
  }, []);

  const handleStartingDate = date => {
    const today = new Date();
    if (date >= today) setStartingDate(date);
    if (date >= endingDate) setEndingDate(date);
  };

  const handleEndingDate = date => {
    if (date >= startingDate) setEndingDate(date);
  };

  const handleStaringHour = e => {
    const [hours, minutes] = e.target.value.split(":");
    const today = new Date();
    const newDate = new Date(startingDate);
    newDate.setHours(hours);
    newDate.setMinutes(minutes);
    if (newDate >= today) setStartingDate(newDate);
    if (newDate >= endingDate) setEndingDate(newDate);
  };

  const handleEndingHour = e => {
    const [hours, minutes] = e.target.value.split(":");

    const newDate = new Date(endingDate);
    newDate.setHours(hours);
    newDate.setMinutes(minutes);

    if (newDate >= startingDate) setEndingDate(newDate);
  };

  const handleSubmitRoute = async () => {
    const send = {
      // Path_Name: "Try1",
      // Applicant_User_Id: "123456789",
      // Array_Of_Points: geoJsonToSend,
      // Is_Permanent: isPermanent,
      // Terms_Text: "???????",
      // Reason_Text: reason,
      // Remarks: remarks ? remarks : "hello world",
      _id,
      Status_Name: status,
    };
    await axiosConfig.put("/path", send);

    fetchRoutesData();
    setSideMenu(false);
  };

  const handleDeleteRoute = async () => {
    const send = {
      data: { _id },
    };
    await axiosConfig.delete("/path", send);
    setOpen(false);
    fetchRoutesData();

    setSideMenu(false);
  };

  return (
    <>
      <h1>View Route</h1>

      <span style={{ fontSize: "20px" }}>
        {Path_Name}{" "}
        {Is_Permanent ? (
          <>
            <span style={{ fontWeight: "bold", marginRight: "10px" }}>
              - Permanent Route
            </span>
            <FaLock />
          </>
        ) : (
          ""
        )}
      </span>
      {!Is_Permanent && (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <div>
            <KeyboardDatePicker
              disabled
              color="secondary"
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              label="Pick Starting Date"
              value={startingDate}
              onChange={handleStartingDate}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
            <TextField
              disabled
              color="secondary"
              style={{ marginTop: "16px", width: "100px" }}
              label="Starting Hour"
              type="time"
              value={`${
                startingDate.getHours() < 10
                  ? "0" + startingDate.getHours()
                  : startingDate.getHours()
              }:${
                startingDate.getMinutes() < 10
                  ? "0" + startingDate.getMinutes()
                  : startingDate.getMinutes()
              }`}
              onChange={handleStaringHour}
              className={classes.textField}
            />
          </div>
          <div style={{ marginTop: "1rem" }}>
            <KeyboardDatePicker
              disabled
              color="secondary"
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              label="Pick Ending Date"
              value={endingDate}
              onChange={handleEndingDate}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
            <TextField
              disabled
              color="secondary"
              style={{ marginTop: "16px", width: "100px" }}
              label="Ending Hour"
              type="time"
              value={`${
                endingDate.getHours() < 10
                  ? "0" + endingDate.getHours()
                  : endingDate.getHours()
              }:${
                endingDate.getMinutes() < 10
                  ? "0" + endingDate.getMinutes()
                  : endingDate.getMinutes()
              }`}
              onChange={handleEndingHour}
              className={classes.textField}
            />
          </div>
        </MuiPickersUtilsProvider>
      )}

      <TextField
        disabled
        style={{ backgroundColor: "rgba(0, 0, 0, 0.06)", marginTop: "1rem" }}
        color="secondary"
        label="Reason"
        variant="outlined"
        value={Reason_Text}
      />
      <TextField
        disabled
        style={{ backgroundColor: "rgba(0, 0, 0, 0.06)", marginTop: "1rem" }}
        color="secondary"
        label="Remarks"
        multiline
        rows={3}
        variant="outlined"
        value={Remarks}
      />

      {!Is_Permanent && (
        <FormControl style={{ margin: "1rem 0" }} color="secondary">
          <InputLabel id="route-status">Route Status</InputLabel>
          <Select
            labelId="route-status"
            value={status}
            onChange={e => setStatus(e.target.value)}
          >
            {statusesArray.map(status => (
              <MenuItem
                disabled={status.name === STATUSES.Submitted.name}
                key={status.name}
                value={status.name}
              >
                {status.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      <div>
        <Button
          variant="contained"
          color="secondary"
          style={{
            margin: "1rem 0",
            width: "100%",
          }}
          onClick={handleClickOpen}
        >
          Delete
        </Button>
        <Dialog
          style={{ zIndex: 10000 }}
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Delete Route</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are You Sure You Want To Delete This Route?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              Cancel
            </Button>
            <Button
              onClick={handleDeleteRoute}
              color="primary"
              variant="contained"
              disableElevation
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <Button
        variant="contained"
        color="secondary"
        style={{
          alignSelf: "flex-end",
          padding: "0.5rem 2rem",
          margin: "1rem 0",
        }}
        onClick={handleSubmitRoute}
      >
        Send
      </Button>
    </>
  );
}

export default ViewAndChange;
