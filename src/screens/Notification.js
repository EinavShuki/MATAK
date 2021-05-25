import React, { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import NavBar from "../components/NavBar";
import IconButton from "@material-ui/core/IconButton";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { BiEnvelopeOpen, BiEnvelope } from "react-icons/bi";
import axiosConfig from "../config/axiosConfig";
import axios from "axios";
import Modal from "./MatakModal";
import RoutesDetailsNotifications from "../components/RoutesDetailsNotifications/RoutesDetailsNotifications";

const Notifications = () => {
  const [changeStatusUnread, setChangeStatusUnread] = useState(false);
  const [changeStatusRead, setChangeStatusRead] = useState(false);
  const [allRows, setAllRows] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const columns = [
    { field: "Read", headerName: "Is Read", width: 120 },
    { field: "_id", headerName: "ID", hide: true },
    { field: "Notification_Text", headerName: "Type", width: 180 },
    {
      field: "createdAt",
      type: "date",
      headerName: "Date",
      width: 200,
    },
    {
      field: "Sender_Name",
      headerName: "Sender",
      width: 200,
    },
    {
      field: "Sender_Email",
      headerName: "Sender Email",
      width: 200,
    },
    {
      field: "Path_Name",
      headerName: "Route Name",
      description: "Click on square for more information",
      width: 200,
    },
  ];

  const source = axios.CancelToken.source();
  const callNotifications = async () => {
    try {
      const { data } = await axiosConfig.get("/notification", {
        cancelToken: source.token,
      });
      // console.log(data.data);
      data.data.forEach(noti => {
        noti.createdAt = noti.createdAt.slice(0, 19);
        noti.createdAt = noti.createdAt.replace("T", " ");
      });
      setNotifications(data.data);
    } catch (err) {
      console.error("error:", err.message);
    }
  };

  //get all notificaations
  useEffect(() => {
    callNotifications();

    return () => {
      source.cancel("Cleanup");
    };
  }, []);

  //update notifications
  const changeStatus = async (read = true) => {
    try {
      console.log("rows", allRows);
      let url = read ? "/notification" : "/notification/unread";
      let rows = allRows.map(row => row);
      await axiosConfig.put(url, {
        _id: rows,
      });
    } catch (err) {
      console.error("error:", err.message);
    }
    callNotifications();
  };

  useEffect(() => {
    changeStatus();
  }, [changeStatusRead]);
  useEffect(() => {
    changeStatus(false);
  }, [changeStatusUnread]);

  const signAsRead = () => {
    setChangeStatusRead(prv => !prv);
  };
  const signAsUnRead = () => {
    setChangeStatusUnread(prv => !prv);
  };

  //delete rows
  const deleteClickHandler = async () => {
    try {
      await axiosConfig.delete("/notification", {
        data: {
          _id: allRows.map(row => row),
        },
      });
    } catch (err) {
      console.error("error:", err.message);
    }
    callNotifications();
  };

  const CellClickHandler = async e => {
    setShowDetails(true);
    const tragetRoute = e.row.Path_Id;
    console.log(tragetRoute);
    try {
      const { data } = await axiosConfig.post("/path/byid", {
        _id: tragetRoute,
      });
      setSelectedRoute(data.data[0]);
      console.log(selectedRoute);
    } catch (err) {
      console.error(err.message);
    }
  };
  useState(() => {
    console.log("selectedRoute", selectedRoute);
    if (selectedRoute) setShowDetails(true);
  }, [selectedRoute]);

  const fun = e => {
    setAllRows(e.selectionModel);
  };

  const hideModal = () => {
    setShowDetails(false);
    setSelectedRoute(null);
  };

  return (
    <>
      <NavBar />
      <div
        style={{
          position: "relative",
          margin: "5rem auto",
          height: 450,
          width: "90%",
        }}
      >
        <span style={{ display: "flex" }}>
          <h1>Notifications</h1>
          <IconButton style={{ marginLeft: "auto", paddingBottom: 0 }}>
            <BiEnvelopeOpen onClick={signAsRead} />
          </IconButton>
          <IconButton style={{ paddingBottom: 0 }}>
            <BiEnvelope
              style={{ position: "relative", bottom: "-1.6px" }}
              onClick={signAsUnRead}
            />
          </IconButton>
          <IconButton style={{ paddingBottom: 0 }}>
            <RiDeleteBin5Fill
              style={{ color: "#f44336" }}
              onClick={deleteClickHandler}
            />
          </IconButton>
        </span>
        <DataGrid
          className="table_notification"
          onCellClick={CellClickHandler}
          onSelectionModelChange={e => fun(e)}
          getRowId={row => row._id}
          rows={notifications}
          rowHeight="63"
          columns={columns}
          S
          pageSize={5}
          checkboxSelection
          sortModel={[
            {
              field: "createdAt",
              sort: "asc",
            },
          ]}
        ></DataGrid>
        {showDetails && (
          <Modal show onClose={hideModal}>
            {selectedRoute && (
              <RoutesDetailsNotifications selectedRoute={selectedRoute} />
            )}
          </Modal>
        )}
      </div>
    </>
  );
};

export default Notifications;
