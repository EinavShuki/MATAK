import React, {useState} from 'react'
import { DataGrid } from '@material-ui/data-grid';
import {MdDelete, MdModeEdit} from 'react-icons/md';
import Button from '@material-ui/core/Button';
import NavBar from "../components/NavBar";
import Modal from './MatakModal'



const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon',  username: 'username', email: 'email@gmail.com', mobile: '0500008877', usertype: 'Matak', organization: 'matak'},
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', username: 'username', email: 'email@gmail.com', mobile: '0500008877', usertype: 'Matak', organization: 'matak' },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', username: 'username', email: 'email@gmail.com', mobile: '0500008877', usertype: 'Matak', organization: 'matak' },
  { id: 4, lastName: 'Stark', firstName: 'Arya', username: 'username', email: 'email@gmail.com', mobile: '0500008877', usertype: 'Matak', organization: 'matak' },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', username: 'username', email: 'email@gmail.com', mobile: '0500008877', usertype: 'Matak', organization: 'matak' },
  { id: 6, lastName: 'Melisandre', firstName: 'l', username: 'username', email: 'email@gmail.com', mobile: '0500008877', usertype: 'Matak', organization: 'matak' },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', username: 'username', email: 'email@gmail.com', mobile: '0500008877', usertype: 'Matak', organization: 'matak' },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', username: 'username', email: 'email@gmail.com', mobile: '0500008877', usertype: 'Matak', organization: 'matak' },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', username: 'username', email: 'email@gmail.com', mobile: '0500008877', usertype: 'Matak', organization: 'matak' },
];

const ManagementScreen = () => {
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)

  const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  { field: 'mobile', headerName: 'Mobile', width: 130 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'organization', headerName: 'Organization Name', width: 180 },
  { field: 'username', headerName: 'User Name', width: 130 },
  { field: 'usertype', headerName: 'User Type', width: 130 },
  {
    field: "edit",
    headerName: "Edit User",
    width: 130,
    disableClickEventBubbling: true,
    renderCell: (params) => {
      const onClick = () => {
        const api = params.api;
        const fields = api
          .getAllColumns()
          .map((c) => c.field)
          .filter((c) => c !== "__check__" && !!c);
        const thisRow = {};

        fields.forEach((f) => {
          thisRow[f] = params.getValue(f);
        });

        setShowEditModal(true)
        setSelectedRow(thisRow)
      };

      return (
        <Button
        variant="contained"
        style={{ backgroundColor: '#00bbf9', color: '#fff'}}
        startIcon={<MdModeEdit />}
        onClick={onClick}
      >
        Edit
      </Button>)  
    }
  },
  {
    field: "delete",
    headerName: "Delete User",
    width: 130,
    disableClickEventBubbling: true,
    renderCell: (params) => {
      const onClick = () => {
        const api = params.api;
        const fields = api
          .getAllColumns()
          .map((c) => c.field)
          .filter((c) => c !== "__check__" && !!c);
        const thisRow = {};

        fields.forEach((f) => {
          thisRow[f] = params.getValue(f);
        });

        setShowDeleteModal(true)
        setSelectedRow(thisRow)
      };

      return (
        <Button
        variant="contained"
        style={{ backgroundColor: '#f44336', color: '#fff'}}
        startIcon={<MdDelete />}
        onClick={onClick}
      >
        Delete
      </Button>)  
    }
  },
];
  return (
    <>
      <NavBar />
        <div className="table-container">
          <h1>Users</h1>
          <DataGrid rows={rows} columns={columns} pageSize={10} checkboxSelection />
        </div>
      {showEditModal ?
        <Modal text={"Edit User Details"} show handleClose={() => setShowEditModal(false)}>
          <p>{`id: ${selectedRow.id}`}</p>
          <p>{`first name: ${selectedRow.firstName}`}</p>
          <p>{`last name: ${selectedRow.lastName}`}</p>
          <div className="confirm-buttons">
            <Button variant="contained" style={{backgroundColor: "#00c853", color: '#fff', marginRight: '3px'}}>Confirm</Button>
            <Button variant="contained" style={{backgroundColor: "#f44336", color: '#fff'}}>Cancel</Button>
          </div>
        </Modal> : null}
      {showDeleteModal ?
        <Modal text={"Are you sure you to delete this user?"} show handleClose={() => setShowDeleteModal(false)}>
          <p>{`id: ${selectedRow.id}`}</p>
          <p>{`first name: ${selectedRow.firstName}`}</p>
          <p>{`last name: ${selectedRow.lastName}`}</p>
          <div className="confirm-buttons">
            <Button variant="contained" style={{backgroundColor: "#00c853", color: '#fff', marginRight: '3px'}}>Yes</Button>
            <Button variant="contained" style={{backgroundColor: "#f44336", color: '#fff'}}>Cancel</Button>
          </div>
        </Modal> : null}
    </>
  )
}

export default ManagementScreen
