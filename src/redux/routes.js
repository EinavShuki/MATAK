import { createSlice } from "@reduxjs/toolkit";

export const routesSlice = createSlice({
  name: "routes",
  initialState: {
    routeType: '',
    isPermanent: false,
    positions: [],
    loading: "idle",
    error: null,
  },
  reducers: {
    positionsReceived: (state, action) => {
      state.positions = action.payload
    },
    setRouteType: (state, action) => {
      state.routeType = `${action.payload}_ROUTE`;
    },
    setPermanentRoute: (state, action) => {
      state.isPermanent = !state.isPermanent;
    },
    addPosition: (state, action) => {
      state.positions.push(action.payload);
    },
    removePosition: (state, action) => {
      const position = action.payload;
      state.positions = state.positions.filter((pos) => pos !== position);
    },
    routesError: (state, action) => {
      state.error = action.payload;
    },
    routesLoading: (state, action) => {
      state.loading = "pending";
    },
  },
});

export const {
  positionsReceived,
  setRouteType,
  setPermanentRoute,
  addPosition,
  removePosition,
  routesError,
  routesLoading,
} = routesSlice.actions;

export default routesSlice.reducer;

export const fetchRoutes = () => async (dispatch) => {
  dispatch(routesLoading());
  try {
    // WILL BE API CALL
    setTimeout(() => dispatch(positionsReceived("")), 2000);
  } catch (error) {
    dispatch(routesError({ error: "some api error" }));
  }
};
