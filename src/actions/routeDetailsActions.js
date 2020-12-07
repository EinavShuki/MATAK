import {
  TOGGLE_PERMANENT_ROUTE,
  ADD_POSITION,
} from "../constants/routeDetailsConstants";

export const routeType = (type) => (dispatch) => {
  dispatch({
    type: `${type}_ROUTE`,
  });
};

export const permanentRoute = () => (dispatch) => {
  dispatch({
    type: TOGGLE_PERMANENT_ROUTE,
  });
};

export const addPosition = (position) => (dispatch) => {
  dispatch({
    type: ADD_POSITION,
    payload: position,
  });
};
