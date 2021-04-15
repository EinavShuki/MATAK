import { createSlice } from "@reduxjs/toolkit";

export const createdRouteSlice = createSlice({
  name: "createdRoute",
  initialState: {
    isPermanent: false,
    isEditAvailable: false,
    currentCreatedRoute: [],
    startingPosition: null,
    endingPosition: null,
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
      state.startingPosition = null;
      state.endingPosition = null;
    },
    setStartingPosition: (state, { payload }) => {
      state.startingPosition = payload;
    },
    setEndingPosition: (state, { payload }) => {
      state.endingPosition = payload;
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
  setStartingPosition,
  setEndingPosition,
} = createdRouteSlice.actions;

export default createdRouteSlice.reducer;

export const createNewRoute = type => dispatch => {
  dispatch(createRoute({ routeType: type, positions: [] }));
};

export const addPositionToCurrent = position => dispatch => {
  dispatch(addPosition(position));
};

export const addToStartingPosition = position => dispatch => {
  dispatch(setStartingPosition(position));
};

export const addToEndingPosition = position => dispatch => {
  dispatch(setEndingPosition(position));
};
