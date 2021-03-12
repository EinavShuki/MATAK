import { createSlice } from "@reduxjs/toolkit";
import { USERS } from "../api";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    currentUser: null,
    users: [],
    loading: "idle",
    error: null,
  },
  reducers: {
    currentUserReceived: (state, action) => {
      state.currentUser = action.payload;
    },
    usersReceived: (state, action) => {
      state.users = action.payload;
    },
    userLoading: (state, action) => {
      state.loading = "pending";
    },
    userError: (state, action) => {
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
  userError,
  logoutUser,
} = usersSlice.actions;

export default usersSlice.reducer

export const fetchCurrentUser = () => async (dispatch) => {
  dispatch(userLoading());
  try {
    // WILL BE API CALL
    dispatch(currentUserReceived({ id: "123" }));
  } catch (error) {
    dispatch(userError({ error: "some api error" }));
  }
};

export const fetchUsers = () => async (dispatch) => {
  dispatch(userLoading());
  try {
    // WILL BE API CALL
    setTimeout(() => dispatch(usersReceived(USERS)), 2000);
  } catch (error) {
    dispatch(userError({ error: "some api error" }));
  }
};
