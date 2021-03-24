import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { CURRENT_USER, USERS } from "../api";

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
    // WILL BE API CALL
    dispatch(currentUserReceived(CURRENT_USER));
  } catch (error) {
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
    const res = await axios.post(
      "https://www.hitprojectscenter.com/matakapinew/api/users/",
      user
    );
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

export const UpdateUser = (email, phone) => async dispatch => {
  dispatch(userLoading());
  try {
    // WILL BE API CALL
    setTimeout(() => dispatch(userUpdateRecieved(USERS)), 2000);
  } catch (error) {
    dispatch(userError({ error: "some api error" }));
  }
};