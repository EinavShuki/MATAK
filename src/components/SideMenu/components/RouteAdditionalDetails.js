import {
  FormControl,
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";

import React, { useState } from "react";
import { resetRoute } from "../../../redux/createdRoute";
import { turnOffIsHidden } from "../../../redux/userRoutes";
import { useDispatch, useSelector } from "react-redux";
import GeoJsonShape from "../../../classes/GeoJsonShape";
import axiosConfig from "../../../config/axiosConfig";
import useDispatchRoutes from "../../../customHooks/useDispatchRoutes";
import { reasonsArray, phonePrefixes } from "../../../constants/infoConstants";
import DatePicker from "../../DatePicker";
import generate from "project-name-generator";

function RouteAdditionalDetails({ setSideMenu }) {
  const dispatch = useDispatch();
  const { currentCreatedRoute, isPermanent } = useSelector(state => {
    return state.createdRoute;
  });

  const [startingDate, setStartingDate] = useState(new Date());
  const [endingDate, setEndingDate] = useState(new Date());
  const [reason, setReason] = useState(reasonsArray[0]);
  const [driversName, setDriversName] = useState("");
  const [phonePrefix, setPhonePrefix] = useState("050");
  const [phonePostfix, setPhonePostfix] = useState("");
  const [remarks, setRemarks] = useState("");
  const { fetchRoutesData } = useDispatchRoutes();

  function handlePhoneNumber(e) {
    const re = /^[0-9\b]+$/;

    // if value is not blank, then test the regex

    if (e.target.value === "" || re.test(e.target.value)) {
      setPhonePostfix(e.target.value);
    }
  }

  async function handleSubmitRoute() {
    const features = currentCreatedRoute.map(route => {
      const geoJson = new GeoJsonShape(route.routeType);
      geoJson.addCoordinates(route.positions);
      return geoJson;
    });

    const geoJsonToSend = { type: "FeatureCollection", features };

    const send = {
      Array_Of_Points: geoJsonToSend,
      Terms_Text: "???????",
      Path_Name: generate().spaced,
      Start_Date: startingDate,
      End_Date: endingDate,
      Reason_Text: reason,
      Involved_Organ_Array: ["stam"],
      Escort_Organ_Array: ["stam"],
      Is_Permanent: isPermanent,
      Remarks: remarks ? remarks : "hello world",
    };

    try {
      await axiosConfig.post("/path", { data: JSON.stringify(send) });

      dispatch(resetRoute());
      fetchRoutesData();
      dispatch(turnOffIsHidden());
      setSideMenu(false);
    } catch (error) {
      console.log(error);
    }
  }

  const dateController = {
    endingDate,
    setEndingDate,
    startingDate,
    setStartingDate,
  };
  return (
    <>
      <h1>Additional Information</h1>
      <DatePicker {...dateController} isDisabled={false} />
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
