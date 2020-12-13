import {
    USER_LOGING_REQUEST,
    USER_LOGOUT_REQUEST,
  } from "../constants/userConstants";
  
  export const userReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_LOGING_REQUEST:
        return state;
      case USER_LOGOUT_REQUEST:
        return state;
      default:
        return state;
    }
  };