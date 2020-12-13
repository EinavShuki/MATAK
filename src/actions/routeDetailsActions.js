import {
  TOGGLE_PERMANENT_ROUTE,
  ADD_POSITION,
  REMOVE_POSITION,
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

export const removePosition = (position) => (dispatch, getState) => {
  // console.log(  getState());
  // const {routeDetails} = getState();
  // const {positions} = routeDetails;
  const {
    routeDetails: { positions },
  } = getState();
  const filtered = positions.filter((pos) => pos !== position);
  dispatch({
    type: REMOVE_POSITION,
    payload: filtered,
  });
};
