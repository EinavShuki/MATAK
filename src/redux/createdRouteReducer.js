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
    removePosition: (state, action) => {},
  },
});

export const {
  createRoute,
  togglePermanentRoute,
  addPosition,
  removePosition,
} = createdRouteSlice.actions;

export default createdRouteSlice.reducer;

export const routeType = (type) => (dispatch) => {
  dispatch(createRoute({ routeType: type, permanent: false, positions: [] }));
};

export const permanentRoute = () => (dispatch) => {
  dispatch(togglePermanentRoute());
};
export const addPositionToCurrent = (position) => (dispatch) => {
  dispatch(addPosition(position));
};
