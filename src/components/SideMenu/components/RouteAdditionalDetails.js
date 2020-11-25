import {
  FormControl,
  Button,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  NativeSelect,
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
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

  const phonePrefixes = [
    "050",
    "051",
    "052",
    "053",
    "054",
    "055",
    "056",
    "058",
    "059",
  ];

  const classes = useStyles();
  const [startingDate, setStartingDate] = useState(new Date());
  const [endingDate, setEndingDate] = useState(new Date());
  const [reason, setReason] = useState(reasonsArray[0]);
  const [phonePrefix, setPhonePrefix] = useState("050");
  const [phonePostfix, setPhonePostfix] = useState("");

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

    const newDate = new Date(endingDate);
    newDate.setHours(hours);
    newDate.setMinutes(minutes);

    if (newDate >= startingDate) setEndingDate(newDate);
  };

  function handlePhoneNumber(e) {
    if (!Number.isInteger(parseInt(e.target.value))) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      setPhonePostfix(e.target.value);
    }
  }
  return (
    <>
      <h1>Additional Information</h1>
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
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 900,
            }}
          />
        </div>
        <div style={{ marginTop: "1rem" }}>
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
        style={{ margin: "1rem 0", backgroundColor: "rgba(0, 0, 0, 0.06)" }}
        label="Driver's Full Name"
        variant="outlined"
      />
      <InputLabel style={{ margin: "1rem 0 0.5rem 0" }}>
        Driver's Phone Number
      </InputLabel>
      <div style={{ display: "flex", marginBottom: "1rem" }}>
        <FormControl
          variant="outlined"
          color="secondary"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.06)",
            marginRight: "0.5rem",
          }}
        >
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={phonePrefix}
            onChange={(e) => setPhonePrefix(e.target.value)}
          >
            {phonePrefixes.map((prefix, i) => (
              <MenuItem key={prefix + i} value={prefix}>
                {prefix}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          color="secondary"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.06)", flexGrow: "1" }}
          variant="outlined"
          value={phonePostfix}
          onChange={handlePhoneNumber}
          inputProps={{ maxLength: 7 }}
        />
      </div>

      <TextField
        style={{ backgroundColor: "rgba(0, 0, 0, 0.06)", marginTop: "1rem" }}
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
