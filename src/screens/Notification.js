import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import NavBar from "../components/NavBar";
const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "type", headerName: "Type", width: 130 },
  { field: "date", headerName: "Date", width: 100, type: "date" },
  {
    field: "sender",
    headerName: "Sender",
    width: 120,
  },
  {
    field: "notes",
    headerName: "Notes",
    width: 120,
  },
  {
    field: "details",
    headerName: "Details",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 300,
    valueGetter: (params) =>
      `From: ${params.getValue("sender") || "Unknown"} : ${
        params.getValue("notes") || ""
      }`,
  },
];

const rows = [
  {
    id: 1,
    type: "Status Update",
    date: "17:25",
    sender: "Einav",
    notes: "Hello world",
  },
  {
    id: 2,
    type: "Status Update",
    date: "17:25",
    sender: "Roberto",
    notes: "Hello world",
  },
  {
    id: 3,
    type: "Status Update",
    date: "17:25",
    sender: "Ramiro the cat",
    notes: "Hello world",
  },
  { id: 4, type: "Note", date: "17:25", sender: "Mul", notes: "Hello world" },
  { id: 5, type: "Note", date: "17:25", sender: null, notes: "Hello world" },
  {
    id: 6,
    type: "Status Update",
    date: "17:25",
    sender: "Eden",
    notes: "Hello world",
  },
  { id: 7, type: "Note", date: "17:25", sender: "Asaf", notes: "Hello world" },
  {
    id: 8,
    type: "Status Update",
    date: "17:25",
    sender: "Galileo galiley",
    notes: "Hello world",
  },
  {
    id: 9,
    type: "Status Update",
    date: "17:25",
    sender: "God",
    notes: "Hello world",
  },
];

const Notifications = () => {
  return (
    <>
      <NavBar />
      <div style={{ margin: "5rem auto", height: 400, width: "80%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          checkboxSelection
        />
      </div>
    </>
  );
};

export default Notifications;
