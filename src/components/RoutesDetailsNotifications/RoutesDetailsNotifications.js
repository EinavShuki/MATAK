import "./RoutesDetailsNotifications.css";
import React, { useEffect, useMemo, useState } from "react";

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
  } = selectedRoute;

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    if (Start_Date) {
      setStartDate(Start_Date.replace("T", " "));
      setStartDate(prv => prv.slice(0, 18));
    }
    if (End_Date) {
      setEndDate(End_Date.replace("T", " "));
      setEndDate(prv => prv.slice(0, 18));
    }
  }, [startDate, endDate]);
  return (
    <div>
      {" "}
      <h2
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {Path_Name}
      </h2>
      <div>
        <ul className="detail_ul">
          <li>
            <h4>Starting Date</h4>
            <input disabled value={startDate} />
          </li>
          <li>
            <h4>Ending Date</h4>
            <input disabled value={endDate} />
          </li>
          <li>
            <h4>Remarks:</h4> {Remarks}
          </li>
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
    </div>
  );
};

export default RoutesDetailsNotifications;
