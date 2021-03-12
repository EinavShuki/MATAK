import { createSlice } from "@reduxjs/toolkit";
import { CURRENT_USER, USERS } from "../api";

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
      state.loading = 'idle'
    },
    usersReceived: (state, action) => {
      state.users = action.payload;
      state.loading = "idle";
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
    dispatch(currentUserReceived(CURRENT_USER));
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
