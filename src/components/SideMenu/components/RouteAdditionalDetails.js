import {
  FormControl,
  Button,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

function RouteAdditionalDetails() {
  const reasonsArray = [
    "Infrastructure",
    "Repair",
    "Assessment",
    "Sanitation/Waste disposal",
    "Facilities supply",
    "Staff movment",
    "Damage assessment",
    "Needs assessment",
    "Commodities loading",
    "Food distribution",
    "Emergency response",
    "Ambulance",
    "Fire truck",
    "Civil defence",
    "UXO",
  ];
  const classes = useStyles();
  const [startingDate, setStartingDate] = useState(new Date());
  const [endingDate, setEndingDate] = useState(new Date());
  const [reason, setReason] = useState(reasonsArray[0]);

  const handleStartingDate = (date) => {
    const today = new Date();
    if (date >= today) setStartingDate(date);
    if (date >= endingDate) setEndingDate(date);
  };

  const handleEndingDate = (date) => {
    if (date >= startingDate) setEndingDate(date);
  };

  const handleStaringHour = (e) => {
    const [hours, minutes] = e.target.value.split(":");
    const today = new Date();
    const newDate = new Date(startingDate);
    newDate.setHours(hours);
    newDate.setMinutes(minutes);
    if (newDate >= today) setStartingDate(newDate);
    if (newDate >= endingDate) setEndingDate(newDate);
  };

  const handleEndingHour = (e) => {
    const [hours, minutes] = e.target.value.split(":");
    const today = new Date();
    const newDate = new Date(endingDate);
    newDate.setHours(hours);
    newDate.setMinutes(minutes);

    if (newDate >= startingDate) setEndingDate(newDate);
  };

  return (
    <>
      <h1>Additional information</h1>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div>
          <KeyboardDatePicker
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
            color="secondary"
            style={{ marginTop: "16px", width: "100px", paddingLeft: "0.5rem" }}
            label="Starting Hour"
            type="time"
            value={`${startingDate.getHours()}:${
              startingDate.getMinutes() < 10
                ? "0" + startingDate.getMinutes()
                : startingDate.getMinutes()
            }`}
            onChange={handleStaringHour}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 900,
            }}
          />
        </div>
        <div style={{ paddingTop: "1rem" }}>
          <KeyboardDatePicker
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
            color="secondary"
            style={{ marginTop: "16px", width: "100px", paddingLeft: "0.5rem" }}
            label="Ending Hour"
            type="time"
            value={`${endingDate.getHours()}:${
              endingDate.getMinutes() < 10
                ? "0" + endingDate.getMinutes()
                : endingDate.getMinutes()
            }`}
            onChange={handleEndingHour}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 900,
            }}
          />
        </div>
      </MuiPickersUtilsProvider>

      <FormControl style={{ margin: "1rem 0" }} color="secondary">
        <InputLabel id="reason-for-coordination">
          Reason For Coordination
        </InputLabel>
        <Select
          labelId="dreason-for-coordination"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        >
          {reasonsArray.map((reason) => (
            <MenuItem key={reason} value={reason}>
              {reason}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        color="secondary"
        style={{ margin: "1rem 0" }}
        id="outlined-helperText"
        label="Driver's Full Name"
        variant="outlined"
      />

      <TextField
        color="secondary"
        id="outlined-multiline-static"
        label="Notes"
        multiline
        rows={3}
        variant="outlined"
      />

      <Button
        variant="contained"
        color="secondary"
        style={{
          alignSelf: "flex-end",
          padding: "0.5rem 2rem",
          margin: "4rem 0",
        }}
      >
        Send
      </Button>
    </>
  );
}

export default RouteAdditionalDetails;
