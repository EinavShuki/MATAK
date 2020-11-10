import React, { useCallback, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import { Button } from "@material-ui/core";

function Reporting() {
  const statusList = [
    "Check All",
    "Approved",
    "Denied",
    "Submitted",
    "Suspended",
    "Received",
    "Canceled",
    "Completed",
    "Deleted",
  ];
  const organizationList = [
    "Check All",
    "Matak",
    "UN",
    "RC",
    "UNRWA",
    "OCHA",
    "ACU",
    "ARBEL",
  ];

  const reasonsList = [
    "Check All",
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
  const escortsList = [
    "Check All",
    "Matak",
    "UN",
    "RC",
    "UNRWA",
    "OCHA",
    "ACU",
    "ARBEL",
  ];

  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      flexWrap: "wrap",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));
  const classes = useStyles();
  const [reasons, setReasons] = useState({
    CheckAll: false,
    Infrastructure: false,
    Repair: false,
    Assessment: false,
    Sanitation: false,
    FacilitiesSupply: false,
    StaffMovment: false,
    DamageAssessment: false,
    NeedsAssessment: false,
    CommoditiesLoading: false,
    FoodDistribution: false,
    EmergencyResponse: false,
    Ambulance: false,
    FireTruck: false,
    CivilDefence: false,
    UXO: false,
  });
  const [organization, setOrganization] = useState({
    CheckAll: false,
    Matak: false,
    UN: false,
    RC: false,
    UNRWA: false,
    OCHA: false,
    ACU: false,
    ARBEL: false,
  });
  const [status, setStatus] = useState({
    CheckAll: false,
    Approved: false,
    Denied: false,
    Submitted: false,
    Suspended: false,
    Received: false,
    Canceled: false,
    Completed: false,
    Deleted: false,
  });
  const [escort, setEscort] = useState({
    CheckAll: false,
    Matak: false,
    UN: false,
    RC: false,
    UNRWA: false,
    OCHA: false,
    ACU: false,
    ARBEL: false,
  });

  const handleChangeStatus = (event) => {
    setStatus({ ...status, [event.target.name]: event.target.checked });
  };
  const handleChangeOrg = (event) => {
    setOrganization({
      ...organization,
      [event.target.name]: event.target.checked,
    });
  };
  const handleChangeReas = (event) => {
    setReasons({ ...reasons, [event.target.name]: event.target.checked });
  };
  const handleChangeEsc = (event) => {
    setEscort({ ...escort, [event.target.name]: event.target.checked });
  };

  return (
    <>
      <form className={classes.container} noValidate>
        <TextField
          id="startDate"
          label="Pick a Starting Date"
          type="date"
          defaultValue="2020-11-09"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="endDate"
          label="Pick an Ending Date"
          type="date"
          defaultValue="2020-11-09"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </form>
      <div className="checkboxArea">
        <div className="statusDiv">
          <label>Status</label>
          <ul>
            {statusList.map((stat, index) => {
              return (
                <FormControlLabel
                  key={stat + index}
                  control={
                    <Checkbox
                      size="small"
                      checked={status[stat]}
                      onChange={handleChangeStatus}
                      name={stat}
                      color="primary"
                    />
                  }
                  label={stat}
                />
              );
            })}
          </ul>
        </div>
        <div className="organizationDiv">
          <label>Involved Organizations</label>
          <ul>
            {organizationList.map((org, index) => {
              return (
                <FormControlLabel
                  key={org + index}
                  control={
                    <Checkbox
                      size="small"
                      checked={organization[org]}
                      onChange={handleChangeOrg}
                      name={org}
                      color="primary"
                    />
                  }
                  label={org}
                />
              );
            })}
          </ul>
        </div>

        <div className="reasonsDiv">
          <label>Reason For Coordination</label>
          <ul>
            {reasonsList.map((reas, index) => {
              return (
                <FormControlLabel
                  key={reas + index}
                  control={
                    <Checkbox
                      size="small"
                      checked={reasons[reas]}
                      onChange={handleChangeReas}
                      name={reas}
                      color="primary"
                    />
                  }
                  label={reas}
                />
              );
            })}
          </ul>
        </div>
        <div className="escortsDiv">
          <label>Escorting Organization</label>
          <ul>
            {escortsList.map((esc, index) => {
              return (
                <FormControlLabel
                  key={esc + index}
                  control={
                    <Checkbox
                      size="small"
                      checked={escort[esc]}
                      onChange={handleChangeEsc}
                      name={esc}
                      color="primary"
                    />
                  }
                  label={esc}
                />
              );
            })}
          </ul>
        </div>
      </div>
      <button id="cancal_btn">Cancel</button>
      <button id="find_btn">Find</button>
    </>
  );
}

export default Reporting;
