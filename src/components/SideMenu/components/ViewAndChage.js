import {
  Button,
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

import { fetchRoutes } from "../../../redux/userRoutes";
import { useDispatch } from "react-redux";
import axiosConfig from "../../../config/axiosConfig";

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

function ViewAndChage({ selectedRoute, setSideMenu }) {
  const {
    Remarks,
    Reason_Text,
    Is_Permanent,
    Status_Name,
    Path_Name,
    _id,
  } = selectedRoute;

  const dispatch = useDispatch();
  const [status, setStatus] = useState(Status_Name);
  const createdAt = new Date(selectedRoute.createdAt);
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
    await axiosConfig.put("/path", send, {withCredentials: true});

    dispatch(fetchRoutes());
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
            // value={startingDate}
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
              createdAt.getHours() < 10
                ? "0" + createdAt.getHours()
                : createdAt.getHours()
            }:${
              createdAt.getMinutes() < 10
                ? "0" + createdAt.getMinutes()
                : createdAt.getMinutes()
            }`}
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
            // value={endingDate}
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
            // value={`${
            //   endingDate.getHours() < 10
            //     ? "0" + endingDate.getHours()
            //     : endingDate.getHours()
            // }:${
            //   endingDate.getMinutes() < 10
            //     ? "0" + endingDate.getMinutes()
            //     : endingDate.getMinutes()
            // }`}
            className={classes.textField}
          />
        </div>
      </MuiPickersUtilsProvider>

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

export default ViewAndChage;
