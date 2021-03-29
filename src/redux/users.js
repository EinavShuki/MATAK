import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
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
    },
    userError: (state, action) => {
      state.loading = "idle";
      state.error = action.payload;
    },
    logoutUser: (state, action) => {
      state.currentUser = null;
    },
  },
});

export const {
  currentUserReceived,
  usersReceived,
  userLoading,
  userUpdateRecieved,
  userCreateRecieved,
  userError,
  logoutUser,
} = usersSlice.actions;

export default usersSlice.reducer;

export const fetchCurrentUser = () => async dispatch => {
  dispatch(userLoading());
  try {
    const { data } = await axiosConfig.post("/users/get", {});
    console.log("curr user res", data);
    dispatch(currentUserReceived(CURRENT_USER));
  } catch (error) {
    console.log("oops", error);
    dispatch(userError({ error: "some api error" }));
  }
};

export const fetchUsers = () => async dispatch => {
  dispatch(userLoading());
  try {
    // WILL BE API CALL
    setTimeout(() => dispatch(usersReceived(USERS)), 2000);
  } catch (error) {
    dispatch(userError({ error: "some api error" }));
  }
};

export const createUser = user => async dispatch => {
  dispatch(userLoading());
  try {
    // WILL BE API CALL
    console.log(user);
    const res = await axios.post("/users", user);
    dispatch(userCreateRecieved(res.data));
  } catch (error) {
    dispatch(userError({ error: error.response.data }));
  }
};

export const editUser = user => async dispatch => {
  dispatch(userLoading());
  try {
    // WILL BE API CALL
    console.log(user);
    setTimeout(() => dispatch(userUpdateRecieved(USERS)), 2000);
  } catch (error) {
    dispatch(userError({ error: "some api error" }));
  }
};

export const UpdateUser = (id, email, phone) => async dispatch => {
  dispatch(userLoading());
  try {
    const { data } = await axiosConfig.put("/users", {
      _id: id,
      Email: email,
      Mobile: phone,
    });
    console.log(data);
    setTimeout(() => dispatch(userUpdateRecieved(USERS)), 2000);
  } catch (error) {
    dispatch(userError({ error: "some api error" }));
  }
};
