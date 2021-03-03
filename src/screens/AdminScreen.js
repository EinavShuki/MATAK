import React from 'react'
import { DataGrid } from '@material-ui/data-grid';
import {MdDelete} from 'react-icons/md';
import Button from '@material-ui/core/Button';
import NavBar from "../components/NavBar";

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
    field: "",
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

        return alert(JSON.stringify(thisRow, null, 4));
      };

      // return <Button variant="contained" color="red" onClick={onClick}>Delete</Button>;
      return (
        <Button
        variant="contained"
        color="secondary"
        startIcon={<MdDelete />}
        onClick={onClick}
      >
        Delete
      </Button>)  
    }
  },
  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params) =>
  //     `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
  // },
];

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
  return (
    <>
    <NavBar />
    <div className="table-container">
      <h1>Users</h1>
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
    </div>
    </>
  )
}

export default ManagementScreen
