import { createSlice } from "@reduxjs/toolkit";

export const createdRouteSlice = createSlice({
  name: "createdRoute",
  initialState: {
    isPermanent: false,
    isEditAvailable: false,
    currentCreatedRoute: [],
  },
  reducers: {
    editAvailableOn: state => {
      state.isEditAvailable = true;
    },
    editAvailableOff: state => {
      state.isEditAvailable = false;
    },
    createRoute: (state, { payload }) => {
      state.currentCreatedRoute.unshift(payload);
    },
    togglePermanentRoute: state => {
      state.isPermanent = !state.isPermanent;
    },
    addPosition: (state, { payload }) => {
      const latestRoute = state.currentCreatedRoute[0];
      if (
        latestRoute.routeType === "Polygon" ||
        latestRoute.routeType === "LineString"
      ) {
        latestRoute.positions.push(payload);
      } else {
        latestRoute.positions = [payload];
      }
    },
    removeLastRoute: state => {
      state.currentCreatedRoute.shift();
    },
    removeLastPoint: state => {
      state.currentCreatedRoute[0].positions.pop();
    },
    resetRoute: state => {
      state.isPermanent = false;
      state.isEditAvailable = false;
      state.currentCreatedRoute = [];
    },
  },
});

export const {
  createRoute,
  togglePermanentRoute,
  addPosition,
  removeLastRoute,
  editAvailableOn,
  editAvailableOff,
  removeLastPoint,
  resetRoute,
} = createdRouteSlice.actions;

export default createdRouteSlice.reducer;

export const createNewRoute = type => dispatch => {
  dispatch(createRoute({ routeType: type, positions: [] }));
};

export const addPositionToCurrent = position => dispatch => {
  dispatch(addPosition(position));
};
