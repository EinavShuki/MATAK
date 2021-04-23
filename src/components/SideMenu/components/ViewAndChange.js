import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@material-ui/core";
import { FaLock } from "react-icons/fa";
import React, { useMemo, useState } from "react";
import { STATUSES } from "../../../constants/statusConstants";
import axiosConfig from "../../../config/axiosConfig";
import useDispatchRoutes from "../../../customHooks/useDispatchRoutes";
import DatePicker from "../../DatePicker";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleIsHidden,
  showfilteredRoutes,
  turnOffIsHidden,
} from "../../../redux/userRoutes";
import { resetStartAndEnd } from "../../../redux/createdRoute";

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
    Driver_Name,
    Car_Liecene_Number,
    Terms_Text,
  } = selectedRoute;

  const dispatch = useDispatch();

  const {
    currentUser: { isAdminOrMatakUser },
  } = useSelector(state => state.users);

  const { isHidden } = useSelector(state => {
    return state.userRoutes;
  });
  const { fetchRoutesData } = useDispatchRoutes();
  const [status, setStatus] = useState(Status_Name);
  const [terms, setTerms] = useState(Terms_Text);

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
      Terms_Text: terms,
      Start_Date: startingDate,
      End_Date: endingDate,
      _id,
      Status_Name: Status_Name === "Changes-Required" ? "Submitted" : status,
    };
    try {
      await axiosConfig.put("/path", send);

      fetchRoutesData();
      setSideMenu(false);
      dispatch(turnOffIsHidden());
      dispatch(resetStartAndEnd());
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteRoute = async () => {
    const send = {
      data: { _id },
    };
    try {
      await axiosConfig.delete("/path", send);
      setOpen(false);
      fetchRoutesData();
      dispatch(turnOffIsHidden());
      dispatch(resetStartAndEnd());

      setSideMenu(false);
    } catch (error) {
      console.log(error);
    }
  };

  const dateController = {
    endingDate,
    setEndingDate,
    startingDate,
    setStartingDate,
  };

  const handleHideOtherRoutes = () => {
    dispatch(toggleIsHidden());
    dispatch(showfilteredRoutes(selectedRoute));
  };
  return (
    <>
      <h1>View Route</h1>

      <FormControlLabel
        control={
          <Switch
            checked={isHidden}
            onChange={handleHideOtherRoutes}
            name="hide-routes"
            color="secondary"
          />
        }
        label="Hide Other Routes"
      />
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
      <DatePicker
        {...dateController}
        isDisabled={Status_Name !== "Changes-Required"}
      />
      <TextField
        disabled={!isAdminOrMatakUser}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.06)", margin: "0.8rem 0" }}
        color="secondary"
        label="Terms"
        multiline
        rows={2}
        variant="outlined"
        value={terms}
        onChange={e => setTerms(e.target.value)}
      />
      <TextField
        disabled
        style={{ backgroundColor: "rgba(0, 0, 0, 0.06)", margin: "0.8rem 0" }}
        color="secondary"
        label="Reason"
        variant="outlined"
        value={Reason_Text}
      />

      <TextField
        disabled
        color="secondary"
        style={{ margin: "0.8rem 0", backgroundColor: "rgba(0, 0, 0, 0.06)" }}
        label="Driver's Full Name"
        variant="outlined"
        value={Driver_Name}
      />

      <TextField
        disabled
        color="secondary"
        style={{ margin: "0.8rem 0", backgroundColor: "rgba(0, 0, 0, 0.06)" }}
        label="Car Number"
        variant="outlined"
        value={Car_Liecene_Number}
      />
      <TextField
        disabled
        style={{ backgroundColor: "rgba(0, 0, 0, 0.06)", margin: "0.8rem 0" }}
        color="secondary"
        label="Remarks"
        multiline
        rows={3}
        variant="outlined"
        value={Remarks}
      />

      {!Is_Permanent && (
        <FormControl style={{ margin: "0.8rem 0" }} color="secondary">
          <InputLabel id="route-status">Route Status</InputLabel>
          <Select
            labelId="route-status"
            value={status}
            onChange={e => setStatus(e.target.value)}
            disabled={!isAdminOrMatakUser}
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
        {isAdminOrMatakUser && (
          <>
            <Button
              variant="contained"
              color="secondary"
              style={{
                margin: "0.8rem 0",
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
          </>
        )}
      </div>
      <Button
        variant="contained"
        color="secondary"
        style={{
          alignSelf: "flex-end",
          padding: "0.5rem 2rem",
          margin: "0.8rem 0",
        }}
        onClick={handleSubmitRoute}
      >
        Send
      </Button>
    </>
  );
}

export default ViewAndChange;
