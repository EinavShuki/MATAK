import React, { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import NavBar from "../components/NavBar";
import IconButton from "@material-ui/core/IconButton";
import { RiDeleteBin5Fill } from "react-icons/ri";
import axios from "axios";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "type", headerName: "Type", width: 160 },
  { field: "date", headerName: "Date", width: 130, type: "date" },
  {
    field: "sender",
    headerName: "Sender",
    width: 170,
  },
  {
    field: "notes",
    headerName: "Notes",
    width: 350,
  },
  {
    field: "routeDetails",
    headerName: "Route Details",
    description: "Click on square for more information",
    width: 510,
  },
];

const rows = [
  {
    id: 1,
    type: "Status Update",
    date: "17:25",
    sender: "Einav",
    notes: "Hello world",
    routeDetails: "Info1",
  },
  {
    id: 2,
    type: "Status Update",
    date: "17:25",
    sender: "Roberto",
    notes: "Hello world",
    routeDetails: "Info34",
  },
  {
    id: 3,
    type: "Status Update",
    date: "17:25",
    sender: "Ramiro the cat",
    notes: "Hello world",
    routeDetails: "Info4",
  },
  {
    id: 4,
    type: "Note",
    date: "17:25",
    sender: "Mul",
    notes: "Hello world",
    routeDetails: "Info3",
  },
  {
    id: 5,
    type: "Note",
    date: "17:25",
    sender: null,
    notes: "Hello world",
    routeDetails: "Info1",
  },
  {
    id: 6,
    type: "Status Update",
    date: "17:25",
    sender: "Eden",
    notes: "Hello world",
    routeDetails: "Info56",
  },
  {
    id: 7,
    type: "Note",
    date: "17:25",
    sender: "Asaf",
    notes: "Hello world",
    routeDetails: "Info76",
  },
  {
    id: 8,
    type: "Status Update",
    date: "17:25",
    sender: "Galileo galiley",
    notes: "Hello world",
    routeDetails: "Info31",
  },
  {
    id: 9,
    type: "Status Update",
    date: "17:25",
    sender: "God",
    notes: "Hello world",
    routeDetails: "Info2",
  },
];

const Notifications = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  useEffect(() => {
    //do async axios request-redux is not necessery here
  }, []);

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
        />
      </div>
    </>
  );
};

export default Notifications;
