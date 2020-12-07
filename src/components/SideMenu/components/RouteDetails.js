import React, { useState } from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import TextField from "@material-ui/core/TextField";
import { ROUTE_ADDITIONAL_DETAILS } from "../../../constants/pageConstants";
import { Switch } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import {
  routeType,
  permanentRoute,
} from "../../../actions/routeDetailsActions";

function RouteDetails({ setPage }) {
  const dispatch = useDispatch();

  const routeDetails = useSelector((state) => {
    return state.routeDetails;
  });

  const [hideRoutes, setHideRoutes] = useState(false);
  const handleNext = () => {
    setPage({ open: ROUTE_ADDITIONAL_DETAILS });
  };

  const handleRouteType = (type) => {
    dispatch(routeType(type));
  };

  return (
    <>
      <h1>Create a New Route</h1>
      <FormControlLabel
        control={
          <Checkbox
            checked={routeDetails.isPermanent}
            onChange={() => dispatch(permanentRoute())}
            name="permanentRoute"
          />
        }
        label="Create a Permanent Route"
      />
      <FormControlLabel
        style={{ marginTop: "1.33em" }}
        control={
          <Switch
            checked={hideRoutes}
            onChange={() => setHideRoutes((prev) => !prev)}
            name="hide-routes"
            color="secondary"
          />
        }
        label="Hide Routes"
      />
      <h4>Route Type:</h4>
      <ButtonGroup color="secondary" aria-label="outlined primary button group">
        <Button
          onClick={() => handleRouteType("POLYLINE")}
          variant={routeDetails.routeType === "POLYLINE" ? "contained" : ""}
          style={{ width: "100%" }}
        >
          Line Route
        </Button>
        <Button
          variant={routeDetails.routeType === "POLYGONE" ? "contained" : ""}
          onClick={() => handleRouteType("POLYGONE")}
          style={{ width: "100%" }}
        >
          Area
        </Button>
        <Button
          variant={routeDetails.routeType === "PINPOINT" ? "contained" : ""}
          onClick={() => handleRouteType("PINPOINT")}
          style={{ width: "100%" }}
        >
          Point
        </Button>
      </ButtonGroup>

      <h4 className="pt-5">Add Manually:</h4>
      <div>
        <TextField
          style={{
            marginRight: "0.5rem",
            backgroundColor: "rgba(0, 0, 0, 0.06)",
          }}
          color="secondary"
          id="outlined-number"
          label="Latitude"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />

        <TextField
          style={{
            marginRight: "0.5rem",
            backgroundColor: "rgba(0, 0, 0, 0.06)",
          }}
          color="secondary"
          id="outlined-number"
          label="Longitude"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        <Button
          variant="contained"
          color="secondary"
          style={{ fontSize: "1.6rem" }}
        >
          +
        </Button>
      </div>
      <Button
        variant="contained"
        color="secondary"
        style={{
          alignSelf: "flex-end",
          padding: "0.5rem 2rem",
          margin: "4rem 0",
        }}
        onClick={handleNext}
      >
        Next
      </Button>
    </>
  );
}

export default RouteDetails;
