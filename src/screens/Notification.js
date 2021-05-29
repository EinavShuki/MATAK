import React, { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import NavBar from "../components/NavBar";
import IconButton from "@material-ui/core/IconButton";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { BiEnvelopeOpen, BiEnvelope } from "react-icons/bi";
import { CgUnavailable } from "react-icons/cg";
import axiosConfig from "../config/axiosConfig";
import Modal from "./MatakModal";
import RoutesDetailsNotifications from "../components/RoutesDetailsNotifications/RoutesDetailsNotifications";

const Notifications = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [wasDeleted, setWasDeleted] = useState("");
  const columns = [
    {
      field: "Read",
      headerName: "Read",
      width: 95,
      disableClickEventBubbling: true,
      renderCell: params => {
        return params.row.Read ? (
          <BiEnvelopeOpen color=" #b0b0b0 " fontSize="20px" />
        ) : (
          <BiEnvelope fontSize="20px" />
        );
      },
    },

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

  const callNotifications = async () => {
    try {
      const { data } = await axiosConfig.get("/notification");
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
  }, []);

  //update notifications
  const changeStatus = async status => {
    if (selectedRows) {
      try {
        const url = `/notification/${status ? "" : "unread"}`;
        await axiosConfig.put(url, {
          _id: selectedRows,
        });
      } catch (err) {
        console.error("error:", err.message);
      }
      await callNotifications();
    }
  };

  //delete rows
  const deleteClickHandler = async () => {
    try {
      await axiosConfig.delete("/notification", {
        data: {
          _id: selectedRows,
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
    try {
      const { data } = await axiosConfig.post("/path/byid", {
        _id: tragetRoute,
      });
      if (data.data[0]) {
        setSelectedRoute(data.data[0]);
      } else {
        setWasDeleted("This route is not longer available ");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleSelectRows = e => {
    setSelectedRows(e.selectionModel);
  };

  const hideModal = () => {
    setShowDetails(false);
    setSelectedRoute(null);
    setWasDeleted("");
  };

  const updateNotificationStatus = status => {
    changeStatus(status);
  };

  return (
    <>
      <NavBar />
      <div
        style={{
          position: "relative",
          margin: "5rem auto",
          height: 450,
          width: "85%",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h1 style={{ display: "inline-block", margin: 0 }}>Notifications</h1>
          <div>
            <IconButton>
              <BiEnvelopeOpen onClick={() => updateNotificationStatus(true)} />
            </IconButton>
            <IconButton>
              <BiEnvelope onClick={() => updateNotificationStatus(false)} />
            </IconButton>
            <IconButton>
              <RiDeleteBin5Fill
                style={{ color: "rgb(211, 19, 19)" }}
                onClick={deleteClickHandler}
              />
            </IconButton>
          </div>
        </div>
        <DataGrid
          className="table_notification"
          onCellClick={CellClickHandler}
          onSelectionModelChange={e => handleSelectRows(e)}
          getRowId={row => row._id}
          rows={notifications}
          rowHeight="63"
          columns={columns}
          pageSize={5}
          checkboxSelection
          sortModel={[
            {
              field: "createdAt",
              sort: "desc",
            },
          ]}
        ></DataGrid>
        {showDetails && (
          <Modal show onClose={hideModal}>
            {selectedRoute ? (
              <RoutesDetailsNotifications selectedRoute={selectedRoute} />
            ) : (
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ display: "inline-block", fontSize: "26px" }}>
                  {wasDeleted}
                  {wasDeleted ? <CgUnavailable fontSize={20} /> : ""}
                </div>
              </div>
            )}
          </Modal>
        )}
      </div>
    </>
  );
};

export default Notifications;
