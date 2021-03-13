import { createSlice } from "@reduxjs/toolkit";

export const createdRouteSlice = createSlice({
  name: "createdRoute",
  initialState: [],
  reducers: {
    createRoute: (state, { payload }) => {
      state.unshift(payload);
    },
    togglePermanentRoute: (state, action) => {
      state[0].isPermanent = !state[0].isPermanent;
    },
    addPosition: (state, { payload }) => {
      const currentRoute = state[0];
      if (
        currentRoute.routeType === "Polygon" ||
        currentRoute.routeType === "LineString"
      ) {
        currentRoute.positions.push(payload);
      } else {
        currentRoute.positions = [payload];
      }
    },
    removeLastRoute: (state, action) => {
      state.pop();
    },
  },
});

export const {
  createRoute,
  togglePermanentRoute,
  addPosition,
  removeLastRoute,
} = createdRouteSlice.actions;

export default createdRouteSlice.reducer;

export const createNewRoute = (type) => (dispatch) => {
  dispatch(createRoute({ routeType: type, permanent: false, positions: [] }));
};

export const addPositionToCurrent = (position) => (dispatch) => {
  dispatch(addPosition(position));
};
