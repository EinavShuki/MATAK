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
  KeyboardDatePicker,
} from "@material-ui/pickers";
import React, { useState } from "react";
import { resetRoute } from "../../../redux/createdRoute";
import { fetchRoutes, turnOffIsHidden } from "../../../redux/userRoutes";
import { useDispatch, useSelector } from "react-redux";
import GeoJsonShape from "../../../classes/GeoJsonShape";
import { STATUSES } from "../../../constants/statusConstants";
import axiosConfig from "../../../config/axiosConfig";

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

function RouteAdditionalDetails({ setSideMenu }) {
  const dispatch = useDispatch();
  const { currentCreatedRoute, isPermanent } = useSelector(state => {
    return state.createdRoute;
  });

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
  const [driversName, setDriversName] = useState("");
  const [phonePrefix, setPhonePrefix] = useState("050");
  const [phonePostfix, setPhonePostfix] = useState("");
  const [remarks, setRemarks] = useState("");

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

  function handlePhoneNumber(e) {
    const re = /^[0-9\b]+$/;

    // if value is not blank, then test the regex

    if (e.target.value === "" || re.test(e.target.value)) {
      setPhonePostfix(e.target.value);
    }
  }

  async function handleSubmitRoute() {
    // console.log(startingDate);
    // console.log(endingDate);
    // console.log(reason);
    // console.log(driversName);
    // console.log(phonePrefix);
    // console.log(phonePostfix);
    // console.log(notesText);
    // console.log(isPermanent);
    const features = currentCreatedRoute.map(route => {
      const geoJson = new GeoJsonShape(route.routeType);
      geoJson.addCoordinates(route.positions);
      return geoJson;
    });

    const geoJsonToSend = { type: "FeatureCollection", features };

    const send = {
      Array_Of_Points: geoJsonToSend,
      Terms_Text: "???????",

      Path_Name: "Try1",

      Start_Date: startingDate,
      End_Date: endingDate,
      Reason_Text: reason,
      Involved_Organ_Array: ["stam"],
      Escort_Organ_Array: ["stam"],
      Is_Permanent: isPermanent,
      Remarks: remarks ? remarks : "hello world",
    };

    await axiosConfig.post("/path", { data: JSON.stringify(send) });

    dispatch(resetRoute());
    dispatch(fetchRoutes());
    dispatch(turnOffIsHidden());
    setSideMenu(false);
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
          labelId="reason-for-coordination"
          value={reason}
          onChange={e => setReason(e.target.value)}
        >
          {reasonsArray.map(reason => (
            <MenuItem key={reason} value={reason}>
              {reason}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl style={{ margin: "1rem 0" }} color="secondary">
        <InputLabel id="car">Car</InputLabel>
        <Select
          labelId="car"
          value={1}
          // onChange={e => setReason(e.target.value)}
        >
          {[1, 2, 3].map(car => (
            <MenuItem key={car} value={car}>
              {car}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        color="secondary"
        style={{ margin: "1rem 0", backgroundColor: "rgba(0, 0, 0, 0.06)" }}
        label="Driver's Full Name"
        variant="outlined"
        value={driversName}
        onChange={e => setDriversName(e.target.value)}
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
            onChange={e => setPhonePrefix(e.target.value)}
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
        label="Remarks"
        multiline
        rows={3}
        variant="outlined"
        value={remarks}
        onChange={e => setRemarks(e.target.value)}
      />
      <input style={{ marginTop: "1rem" }} type="file" />
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

export default RouteAdditionalDetails;
