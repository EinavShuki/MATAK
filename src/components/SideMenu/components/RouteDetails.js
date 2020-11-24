import React, { useState } from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import TextField from "@material-ui/core/TextField";
import { ROUTE_ADDITIONAL_DETAILS } from "../../../constants/pageConstants";
import { Switch } from "@material-ui/core";

function RouteDetails({ setPage }) {
  const [permanent, setPermanent] = useState(false);
  const [hideRoutes, setHideRoutes] = useState(false);
  const handleNext = () => {
    setPage({ open: ROUTE_ADDITIONAL_DETAILS });
  };
  return (
    <>
      <h1>Create a New Route</h1>
      <FormControlLabel
        control={
          <Checkbox
            checked={permanent}
            onChange={() => setPermanent((prev) => !prev)}
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
        <Button style={{ width: "100%" }}>Line Route</Button>
        <Button style={{ width: "100%" }}>Area</Button>
        <Button style={{ width: "100%" }}>Point</Button>
      </ButtonGroup>

      <h4 className="pt-5">Add Manually:</h4>
      <div>
        <TextField
          style={{
            marginRight: "0.5rem",
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
