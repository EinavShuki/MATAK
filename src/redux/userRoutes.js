import { createSlice } from "@reduxjs/toolkit";
import axiosConfig from "../config/axiosConfig";

export const userRoutesSlice = createSlice({
  name: "userRoutes",
  initialState: {
    isHidden: false,
    routes: [],
  },
  reducers: {
    setRoutes: (state, { payload }) => {
      state.routes = [...payload];
    },
    toggleIsHidden: state => {
      state.isHidden = !state.isHidden;
    },
    turnOffIsHidden: state => {
      state.isHidden = false;
    },
  },
});

export const {
  setRoutes,
  toggleIsHidden,
  turnOffIsHidden,
} = userRoutesSlice.actions;

export default userRoutesSlice.reducer;

export const fetchRoutes = params => async dispatch => {
  try {
    const { data } = await axiosConfig.post("/path/get", params);

    let routesDetailsArray = data.data;

    const result = routesDetailsArray.map(route => {
      const arrayOfPoints = route["Array_Of_Points"]["features"].map(
        feature => {
          const _id = route["_id"];
          return { ...feature, properties: { _id } };
        }
      );

      return { ...route, Array_Of_Points: arrayOfPoints };
    });

    dispatch(setRoutes(result));
  } catch (error) {
    console.log(error);
  }
};
