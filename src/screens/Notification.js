import React, { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import NavBar from "../components/NavBar";
import IconButton from "@material-ui/core/IconButton";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { notifications } from "../fakeNotifications";
import axios from "axios";
import { MdModeEdit } from "react-icons/md";
import { Button } from "@material-ui/core";

const Notifications = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [changeStatus, setChangeStatus] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const columns = [
    {
      field: "statusBtn",
      headerName: "Status Button",
      width: 150,
      disableClickEventBubbling: true,
      renderCell: params => {
        const onClick = () => {
          const api = params.api;
          const fields = api
            .getAllColumns()
            .map(c => c.field)
            .filter(c => c !== "__check__" && !!c);
          const thisRow = {};

          fields.forEach(f => {
            thisRow[f] = params.getValue(f);
          });

          setChangeStatus(prev => !prev);
          setSelectedRow(thisRow);
        };

        return (
          <Button
            style={{ fontSize: "0.875rem" }}
            variant="contained"
            color="primary"
            onClick={onClick}
          >
            read / unread
          </Button>
        );
      },
    },
    { field: "isRead", headerName: "Is Read", width: 120 },
    { field: "id", headerName: "ID", width: 0 },
    { field: "type", headerName: "Type", width: 160 },
    { field: "date", headerName: "Date", width: 130, type: "date" },
    {
      field: "sender",
      headerName: "Sender",
      width: 170,
    },
    {
      field: "senderEmail",
      type: "path",
      headerName: "Sender Email",
      width: 170,
      resizable: true,
    },
    {
      field: "notes",
      headerName: "Notes",
      width: 200,
      resizable: true,
    },
    {
      field: "routeDetails",
      headerName: "Route Details",
      description: "Click on square for more information",
      width: 500,
      resizable: true,
    },
  ];

  const rows = notifications;

  useEffect(() => {
    rows.forEach(row => {
      console.log(row);
    });
    //do async axios request-redux is not necessery here
  }, []);

  useEffect(() => {
    // change is read square booleanicly
    if (selectedRow) {
      notifications.filter(
        x => x.id === selectedRow.id
      )[0].isRead = !notifications.filter(x => x.id === selectedRow.id)[0]
        .isRead;
    }
    //HERE I SEND UPDATE OF NOTIFICATIONS
  }, [changeStatus]);

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
            <RiDeleteBin5Fill style={{ color: "#f44336" }} />
          </IconButton>
        </span>
        <DataGrid
          className="table_notification"
          onRowSelected={rowSelectedHandler}
          onCellClick={CellClickHandler}
          rows={rows}
          rowHeight="63"
          columns={columns}
          pageSize={5}
          checkboxSelection
          sortModel={[
            {
              field: "date",
              sort: "asc",
            },
          ]}
        ></DataGrid>
      </div>
    </>
  );
};

export default Notifications;
