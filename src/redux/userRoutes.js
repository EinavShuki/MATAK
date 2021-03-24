import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userRoutesSlice = createSlice({
  name: "userRoutes",
  initialState: [],
  reducers: {
    setRoutes: (state, { payload }) => {
      //   console.log(payload);
      state.push(...payload);
    },
  },
});

export const { setRoutes } = userRoutesSlice.actions;

export default userRoutesSlice.reducer;

export const fetchRoutes = () => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "https://www.hitprojectscenter.com/matakapinew/api/path/get",
      {},
      config
    );

    dispatch(setRoutes(data.data));
  } catch (error) {
    console.log(error);
  }
};
