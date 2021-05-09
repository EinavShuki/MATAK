import React, { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import NavBar from "../components/NavBar";
import IconButton from "@material-ui/core/IconButton";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { BiEnvelopeOpen, BiEnvelope } from "react-icons/bi";
import axiosConfig from "../config/axiosConfig";
import axios from "axios";

const Notifications = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [changeStatusUnread, setChangeStatusUnread] = useState(false);
  const [changeStatusRead, setChangeStatusRead] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const columns = [
    { field: "Read", headerName: "Is Read", width: 120 },
    { field: "_id", headerName: "ID", hide: true },
    { field: "Notification_Text", headerName: "Type", width: 180 },
    {
      field: "createdAt",
      type: "date",
      headerName: "Date",
      width: 300,
    },
    {
      field: "Sender_Name",
      headerName: "Sender",
      width: 300,
    },
    {
      field: "Sender_Email",
      headerName: "SenderEmails",
      width: 200,
    },
    {
      field: "Path_Name",
      headerName: "Route Details",
      description: "Click on square for more information",
      width: 300,
    },
  ];

  //get all notificaations
  useEffect(() => {
    const source = axios.CancelToken.source();
    const callNotifications = async () => {
      try {
        const { data } = await axiosConfig.get("/notification", {
          cancelToken: source.token,
        });
        console.log(data.data);
        data.data.forEach(noti => {
          noti.createdAt = noti.createdAt.slice(0, 19);
          noti.createdAt = noti.createdAt.replace("T", " ");
        });
        setNotifications(data.data);
      } catch (err) {
        console.error("error:", err.message);
      }
    };
    callNotifications();
    console.log("sent");

    return () => {
      source.cancel("Cleanup");
    };
  }, [changeStatusUnread, changeStatusRead]);

  //update notifications
  const changeStatus = async () => {
    try {
      const { data } = await axiosConfig.put("/notification", {
        _id: `${selectedRows.map(row => {
          return row.data.id;
        })}`,
      });
    } catch (err) {
      console.error("error:", err.message);
    }
  };

  useEffect(() => {
    if (selectedRows) {
      selectedRows.forEach(row => {
        row.data.Read = false;
      });
    }
    changeStatus();
  }, [changeStatusUnread]);

  useEffect(() => {
    if (selectedRows) {
      selectedRows.forEach(row => {
        row.data.Read = true;
      });
    }

    changeStatus();
  }, [changeStatusRead]);

  const signAsRead = () => {
    setChangeStatusRead(prv => !prv);
  };
  const signAsUnRead = () => {
    setChangeStatusUnread(prv => !prv);
  };

  // const deleteClickHandler=()=>{
  //   try {
  //     const {data}=async axios.delete(selectedRows);
  //   } catch (error) {

  //   }
  // }

  const CellClickHandler = e => {
    const tragetRoute = e.row.routeDetails;
    console.log(tragetRoute);
  };
  const rowSelectedHandler = e => {
    if (e.isSelected) {
      setSelectedRows(prev => [...prev, e]);
    } else {
      setSelectedRows(prev => prev.filter(x => x.data.id !== e.data.id));
    }
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
            <RiDeleteBin5Fill style={{ color: "#f44336" }} />
          </IconButton>
        </span>
        <DataGrid
          className="table_notification"
          onRowSelected={rowSelectedHandler}
          onCellClick={CellClickHandler}
          getRowId={row => row._id}
          rows={notifications}
          rowHeight="63"
          columns={columns}
          pageSize={5}
          checkboxSelection
          sortModel={[
            {
              field: "createdAt",
              sort: "asc",
            },
          ]}
        ></DataGrid>
      </div>
    </>
  );
};

export default Notifications;
