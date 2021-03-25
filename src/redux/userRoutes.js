import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userRoutesSlice = createSlice({
  name: "userRoutes",
  initialState: {
    isHidden: false,
    routes: [],
  },
  reducers: {
    setRoutes: (state, { payload }) => {
      state.routes.push(...payload);
    },
    toggleIsHidden: state => {
      state.isHidden = !state.isHidden;
    },
  },
});

export const { setRoutes, toggleIsHidden } = userRoutesSlice.actions;

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
