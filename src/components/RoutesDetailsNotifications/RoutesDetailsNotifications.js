import "./RoutesDetailsNotifications.css";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { FaLock } from "react-icons/fa";
import { RiRoadMapFill } from "react-icons/ri";
import DatePicker from "../DatePicker";
const RoutesDetailsNotifications = ({ selectedRoute }) => {
  const {
    Remarks,
    Reason_Text,
    Is_Permanent,
    Status_Name,
    Path_Name,
    Start_Date,
    End_Date,
    Driver_Name,
    Car_Liecene_Number,
    Start_Point,
    End_Point,
    Driver_Cellphone,
    _id,
  } = selectedRoute;
  let history = useHistory();

  const [startingDate, setStartingDate] = useState(
    new Date(Start_Date ? Start_Date : null)
  );
  const [endingDate, setEndingDate] = useState(
    new Date(End_Date ? End_Date : null)
  );

  const dateController = {
    endingDate,
    setEndingDate,
    startingDate,
    setStartingDate,
  };
  const handleGoToMap = () => {
    const latAvg =
      Math.abs(parseFloat(Start_Point[0]) + parseFloat(End_Point[0])) / 2;
    const lngAvg =
      Math.abs(parseFloat(Start_Point[1]) + parseFloat(End_Point[1])) / 2;
    history.push(`/home/${_id}/${latAvg}-${lngAvg}`);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <span
        style={{
          fontSize: "22px",
          alignSelf: "center",
          textTransform: "capitalize",
        }}
      >
        {Path_Name}
        {Is_Permanent ? (
          <>
            <span
              style={{
                fontWeight: "bold",
                marginRight: "10px",
              }}
            >
              {" "}
              - Permanent Route
            </span>
            <FaLock />
          </>
        ) : (
          ""
        )}
      </span>
      <div>
        <ul className="detail_ul">
          <DatePicker {...dateController} isDisabled={true} />

          <li>
            <h4>Remarks:</h4> {Remarks}
          </li>
          {!Is_Permanent && (
            <>
              {" "}
              <li>
                <h4 style={{ display: "inline" }}>Car Liecene Number:</h4>{" "}
                {Car_Liecene_Number}
              </li>
              <li>
                <h4>Driver Details:</h4> {Driver_Name}, {Driver_Cellphone}
              </li>
              <li>
                <h4 style={{ display: "inline" }}>Status:</h4> {Status_Name}
              </li>
              <li>
                <h4 style={{ display: "inline" }}>Reason: </h4> {Reason_Text}
              </li>
            </>
          )}
          <li>
            <h4 style={{ color: "green" }}>Starting point: </h4>{" "}
            {Start_Point && `[${Start_Point[0]} , ${Start_Point[1]}]`}
          </li>
          <li>
            <h4 style={{ color: "red" }}>Ending point: </h4>{" "}
            {End_Point && `[${End_Point[0]} , ${Start_Point[1]}]`}
          </li>
        </ul>
      </div>
      <Button
        variant="contained"
        color="primary"
        startIcon={<RiRoadMapFill style={{ color: "white" }} />}
        onClick={handleGoToMap}
      >
        See On Map
      </Button>
    </div>
  );
};

export default RoutesDetailsNotifications;
