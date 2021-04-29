import { Button } from "@material-ui/core";

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
import RoutesInfoDetails from "../../RoutesInfoDetails/RoutesInfoDetails";

function RouteAdditionalDetails({ setSideMenu }) {
  const dispatch = useDispatch();
  const {
    currentCreatedRoute,
    isPermanent,
    startingPosition,
    endingPosition,
  } = useSelector(state => {
    return state.createdRoute;
  });
  const {
    currentUser: { Username },
  } = useSelector(state => {
    return state.users;
  });

  const [startingDate, setStartingDate] = useState(new Date());
  const [endingDate, setEndingDate] = useState(new Date());

  const [reason, setReason] = useState(reasonsArray[0]);
  const [driversName, setDriversName] = useState("");
  const [vehicleID, setVehicle] = useState("");
  const [phonePrefix, setPhonePrefix] = useState("050");
  const [phonePostfix, setPhonePostfix] = useState("");
  const [remarks, setRemarks] = useState("");
  const [file, setFile] = useState("");

  const { fetchRoutesData } = useDispatchRoutes();

  async function handleSubmitRoute() {
    const features = currentCreatedRoute.map(route => {
      const geoJson = new GeoJsonShape(route.routeType);
      geoJson.addCoordinates(route.positions);
      return geoJson;
    });

    const geoJsonToSend = {
      type: "FeatureCollection",
      features,
    };

    console.log("file", file);
    const formData = new FormData();
    formData.append("file", file);
    console.log(formData);
    const send = {
      Array_Of_Points: geoJsonToSend,
      Path_Name: generate().spaced,
      Start_Date: startingDate,
      End_Date: endingDate,
      Reason_Text: reason,
      Is_Permanent: isPermanent,
      Remarks: `Created by: ${Username} on ${new Date().toLocaleDateString([], {
        hour12: false,
        hour: "numeric",
        minute: "numeric",
        day: "numeric",
        month: "numeric",
        year: "2-digit",
      })}\n${remarks}`,
      Driver_Name: isPermanent ? "Permanent" : driversName,
      Driver_Cellphone: isPermanent
        ? "Permanent"
        : `${phonePrefix}-${phonePostfix}`,
      Car_Liecene_Number: isPermanent ? "Permanent" : vehicleID,
      Start_Point: startingPosition,
      End_Point: endingPosition,
      Involved_Organ_Array: ["stam"],
      Escort_Organ_Array: ["stam"],
      Terms_Text: "",
      files: formData,
    };

    try {
      await axiosConfig.post("/path", {
        data: JSON.stringify(send),
      });

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

  const RouteInfoDetailsController = {
    reason,
    setReason,
    driversName,
    setDriversName,
    vehicleID,
    setVehicle,
    phonePrefix,
    setPhonePrefix,
    phonePostfix,
    setPhonePostfix,
    remarks,
    setRemarks,
  };

  const onAddFile = e => {
    setFile(e.target.files[0]);
  };

  return (
    <>
      <h1>Additional Information</h1>
      <DatePicker {...dateController} isDisabled={false} />

      {!isPermanent && <RoutesInfoDetails {...RouteInfoDetailsController} />}
      <input
        style={{ marginTop: "1rem" }}
        type="file"
        multiple
        accept="image/png, image/jpeg , .pdf, .heic"
        onChange={onAddFile}
      />
      <Button
        variant="contained"
        color="secondary"
        style={{
          alignSelf: "flex-end",
          padding: "0.5rem 2rem",
          margin: "1rem 0",
        }}
        onClick={handleSubmitRoute}
        disabled={!vehicleID || !phonePostfix || !driversName}
      >
        Send
      </Button>
    </>
  );
}

export default RouteAdditionalDetails;
