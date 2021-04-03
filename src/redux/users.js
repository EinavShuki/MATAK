import { createSlice } from "@reduxjs/toolkit";
import { CURRENT_USER, USERS } from "../api";
import axiosConfig from "../config/axiosConfig";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    currentUser: null,
    users: [],
    loading: "idle",
    error: null,
    results: null,
  },
  reducers: {
    currentUserReceived: (state, action) => {
      state.currentUser = action.payload;
      state.loading = "idle";
    },
    usersReceived: (state, action) => {
      state.users = action.payload;
      state.loading = "idle";
      state.results = null;
    },
    userLoading: (state, action) => {
      state.loading = "pending";
    },
    userUpdateRecieved: (state, action) => {
      state.loading = "idle";
      state.results = action.payload;
    },
    userCreateRecieved: (state, action) => {
      state.loading = "idle";
      state.results = action.payload;
      state.error = null;
    },
    userDeleteRecieved: (state, action) => {
      state.loading = "idle";
      state.results = action.payload;
      state.error = null;
    },
    userError: (state, action) => {
      state.loading = "idle";
      state.results = null;
      state.error = action.payload;
    },
    logoutUser: (state, action) => {
      state.currentUser = null;
    },
    clear: state => {
      state.results = null;
      state.error = null;
    },
  },
});

export const {
  currentUserReceived,
  usersReceived,
  userLoading,
  userUpdateRecieved,
  userCreateRecieved,
  userDeleteRecieved,
  userError,
  logoutUser,
  clear,
} = usersSlice.actions;

export default usersSlice.reducer;

export const fetchCurrentUser = () => async dispatch => {
  dispatch(userLoading());
  try {
    // WILL BE API CALL
    dispatch(currentUserReceived(CURRENT_USER));
  } catch (error) {
    dispatch(userError({ error: "some api error" }));
  }
};

export const fetchUsers = () => async dispatch => {
  dispatch(userLoading());
  try {
    const res = await axiosConfig.post("/users/get", {});
    dispatch(usersReceived(res.data.data));
  } catch (error) {
    dispatch(userError({ error: error.response.data.error }));
  }
};

export const createUser = user => async dispatch => {
  dispatch(userLoading());
  try {
    // WILL BE API CALL
    console.log(user);
    const res = await axiosConfig.post("/users/", user);
    dispatch(userCreateRecieved(res.data.data));
  } catch (error) {
    dispatch(userError('Failed to create a new user'));
  }
};

export const editUser = user => async dispatch => {
  dispatch(userLoading());
  try {
    // WILL BE API CALL
    console.log(user);
    setTimeout(() => dispatch(userUpdateRecieved(USERS)), 2000);
  } catch (error) {
    dispatch(userError("Failed to edit the user"));
  }
};

export const deleteUser = userId => async dispatch => {
  dispatch(userLoading());
  try {
    // WILL BE API CALL
    const res = await axiosConfig.delete("/users", { data: { _id: userId } });
    dispatch(userDeleteRecieved(res.data));
  } catch (error) {
    dispatch(userError("Failed to delete the user"));
  }
};

export const UpdateUser = (email, phone) => async dispatch => {
  dispatch(userLoading());
  try {
    // WILL BE API CALL
    setTimeout(() => dispatch(userUpdateRecieved(USERS)), 2000);
  } catch (error) {
    dispatch(userError({ error: "some api error" }));
  }
};
