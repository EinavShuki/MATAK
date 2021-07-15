import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import { useDispatch, useSelector } from "react-redux";

import {
  turnOnIsHidden,
  showfilteredRoutes,
  turnOffIsHidden,
} from "../../../redux/userRoutes";

import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";
import { reasonsArray } from "../../../constants/infoConstants";
import { STATUSES as StatusesArray } from "../../../constants/statusConstants";

function Reporting() {
  const useStyles = makeStyles(theme => ({
    ulStyle: {
      border: "1px solid rgba(0, 0, 0, 0.1)",
      borderRadius: "5px",
      height: "150px",
      overflowY: "scroll",
      flexWrap: "nowrap",
      padding: "0 0.5rem",
      backgroundColor: "rgba(0, 0, 0, 0.06)",

      "&::-webkit-scrollbar": {
        width: "0.4em",
      },
      "&::-webkit-scrollbar-track": {
        "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "rgba(0,0,0,.1)",
      },
    },
  }));
  const classes = useStyles();
  const [found, setFound] = useState(null);
  const [reasons, setReasons] = useState(() => {
    const array = reasonsArray.map(reason => {
      return { name: reason, checked: true };
    });
    return [{ name: "Check All", checked: true }, ...array];
  });

  const [statuses, setStatuses] = useState(() => {
    const array = [];
    for (const status in StatusesArray) {
      if (status !== "BeingCreated") {
        array.push({ name: status, checked: true });
      }
    }
    return [{ name: "Check All", checked: true }, ...array];
  });

  const [startingDate, setStartingDate] = useState(() => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    return start;
  });
  const [endingDate, setEndingDate] = useState(() => {
    Date.prototype.addDays = function (days) {
      var date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    };
    const end = new Date();
    end.setDate(end.getDate() + 7);
    return end;
  });

  const dispatch = useDispatch();

  const { routes } = useSelector(state => {
    return state.userRoutes;
  });

  const handleChange = (event, setState) => {
    const { checked, name } = event.target;
    if (event.target.name === "Check All") {
      setState(prev => {
        return prev.map(status => {
          return { ...status, checked: checked };
        });
      });
    } else {
      setState(prev => {
        return prev.map(status => {
          return status.name === name
            ? { ...status, checked: !status.checked }
            : { ...status };
        });
      });
    }
  };

  const handleStartingDate = date => {
    setStartingDate(date);
    if (date >= endingDate) setEndingDate(date);
  };

  const handleEndingDate = date => {
    if (date >= startingDate) setEndingDate(date);
  };

  const handleSearch = () => {
    const requestedStatuses = statuses
      .filter(status => status.checked)
      .map(status => status.name);

    const requestedReasons = reasons
      .filter(reason => reason.checked)
      .map(reason => reason.name);

    const filtered = routes.filter(route => {
      if (
        (requestedStatuses.includes(route.Status_Name) ||
          (requestedStatuses.includes("Permanent") && route.Is_Permanent) ||
          requestedReasons.includes(route.Reason_Text)) &&
        new Date(route.Start_Date) >= startingDate &&
        new Date(route.End_Date) <= endingDate
      ) {
        return route;
      }
    });
    setFound(filtered.length);
    dispatch(turnOnIsHidden());
    dispatch(showfilteredRoutes(filtered));
  };

  return (
    <>
      <h1>Find Routes</h1>

      <Grid container spacing={3}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid item md={6} xs={12}>
            <KeyboardDatePicker
              style={{ marginRight: "1rem" }}
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
          </Grid>
          <Grid item md={6} xs={12}>
            <KeyboardDatePicker
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
          </Grid>
        </MuiPickersUtilsProvider>
        <span>"OR" condition between these options below</span>
        <Grid item md={6} xs={12}>
          <label>Status</label>
          <FormGroup className={classes.ulStyle}>
            {statuses.map(status => {
              return (
                <FormControlLabel
                  key={status.name}
                  control={
                    <Checkbox
                      size="small"
                      checked={status.checked}
                      onChange={e => handleChange(e, setStatuses)}
                      name={status.name}
                      color="secondary"
                    />
                  }
                  label={status.name}
                />
              );
            })}
          </FormGroup>
        </Grid>

        <Grid item md={6} xs={12}>
          <label>Reason For Coordination</label>
          <FormGroup className={classes.ulStyle}>
            {reasons.map(reason => {
              return (
                <FormControlLabel
                  key={reason.name}
                  control={
                    <Checkbox
                      size="small"
                      checked={reason.checked}
                      onChange={e => handleChange(e, setReasons)}
                      name={reason.name}
                      color="secondary"
                    />
                  }
                  label={reason.name}
                />
              );
            })}
          </FormGroup>
        </Grid>
      </Grid>

      {found ? (
        <h2>
          {found === 1 ? "One route was " : `${found} routes were `} found in
          this search.
        </h2>
      ) : found === 0 ? (
        <h2>No routes were found, try to modify your search parameters</h2>
      ) : (
        ""
      )}
      <Button
        variant="contained"
        color="secondary"
        style={{
          alignSelf: "flex-end",
          padding: "0.5rem 2rem",
          margin: "2rem 0",
        }}
        onClick={handleSearch}
      >
        Find
      </Button>
    </>
  );
}

export default Reporting;
