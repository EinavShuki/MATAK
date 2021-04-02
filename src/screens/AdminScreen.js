import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  createUser,
  editUser,
  deleteUser,
  clear,
} from "../redux/users";

import { DataGrid } from "@material-ui/data-grid";
import { MdDelete, MdModeEdit, MdAdd } from "react-icons/md";
import Button from "@material-ui/core/Button";
import NavBar from "../components/NavBar";
import Modal from "./MatakModal";
import ActionButtons from "../components/AdminScreen/ActionButtons";
import UserEditForm from "../components/AdminScreen/UserEditForm";

const ManagementScreen = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const { users, loading, results } = useSelector(state => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch, results]);

  const handleCreateUser = user => {
    dispatch(createUser(user));
  };

  const handleEditUser = user => {
    dispatch(editUser(user));
  };

  const handleDeleteUser = () => {
    dispatch(deleteUser(selectedRow._id));
    setShowDeleteModal(false);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 50, hide: true },
    { field: "First_Name", headerName: "First name", width: 160 },
    { field: "Last_Name", headerName: "Last name", width: 160 },
    { field: "Mobile", headerName: "Mobile", width: 130 },
    { field: "Email", headerName: "Email", width: 200 },
    { field: "Organization_Name", headerName: "Organization", width: 160 },
    { field: "Username", headerName: "User Name", width: 160 },
    { field: "User_Type", headerName: "User Type", width: 140 },
    {
      field: "edit",
      headerName: "Edit User",
      width: 130,
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

          setShowEditModal(true);
          setSelectedRow(thisRow);
        };

        return (
          <Button
            variant="contained"
            style={{ backgroundColor: "#00bbf9", color: "#fff" }}
            startIcon={<MdModeEdit />}
            onClick={onClick}
          >
            Edit
          </Button>
        );
      },
    },
    {
      field: "delete",
      headerName: "Delete User",
      width: 160,
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

          setShowDeleteModal(true);
          setSelectedRow(thisRow);
        };

        return (
          <Button
            variant="contained"
            style={{ backgroundColor: "#f44336", color: "#fff" }}
            startIcon={<MdDelete />}
            onClick={onClick}
          >
            Delete
          </Button>
        );
      },
    },
  ];
  return (
    <>
      <NavBar />
      <div className="table-container">
        <div className="table-title">
          <h1>Users</h1>
          <div className="add-btn" onClick={() => setShowCreateUserModal(true)}>
            <MdAdd size={40} />
          </div>
        </div>
        <DataGrid
          rows={users}
          columns={columns}
          getRowId={row => row._id}
          pageSize={10}
          checkboxSelection
          loading={loading === "pending"}
        />
      </div>
      {showCreateUserModal && (
        <Modal
          text={"Create new user"}
          show
          handleClose={() => {
            setShowCreateUserModal(false);
            dispatch(clear());
          }}
        >
          <UserEditForm
            onFormSubmit={handleCreateUser}
            onCancel={() => setShowCreateUserModal(false)}
          />
        </Modal>
      )}
      {showEditModal && (
        <Modal
          text={"Edit User Details"}
          show
          handleClose={() => setShowEditModal(false)}
        >
          <UserEditForm
            user={selectedRow}
            onFormSubmit={handleEditUser}
            onCancel={() => setShowEditModal(false)}
          />
        </Modal>
      )}
      {showDeleteModal && (
        <Modal
          text={"Are you sure you to delete this user?"}
          show
          handleClose={() => setShowDeleteModal(false)}
        >
          <ActionButtons
            onOk={handleDeleteUser}
            onCancel={() => setShowDeleteModal(false)}
          />
        </Modal>
      )}
    </>
  );
};

export default ManagementScreen;
