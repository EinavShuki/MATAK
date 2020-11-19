import React, { useState } from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import TextField from "@material-ui/core/TextField";

function RouteDetails() {
  const [permanent, setPermanent] = useState(false);

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
          color="secondary"
          id="outlined-number"
          label="Longitude"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
      </div>
      <button
        style={{
          alignSelf: "flex-end",
          padding: "0.5rem 2rem",
          margin: "2rem 0",
        }}
        className="frosted-btn"
      >
        Next
      </button>
    </>
  );
}

export default RouteDetails;
