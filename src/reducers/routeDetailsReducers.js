export const routeDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case "POLYGONE_ROUTE":
      return { ...state, routeType: "POLYGONE" };
    case "POLYLINE_ROUTE":
      return { ...state, routeType: "POLYLINE" };
    case "PINPOINT_ROUTE":
      return { ...state, routeType: "PINPOINT" };
    case "TOGGLE_PERMANENT_ROUTE":
      return { ...state, isPermanent: !state.isPermanent };
    case "ADD_POSITION":
      return { ...state, positions: [...state.positions, action.payload] };
    default:
      return state;
  }
};
