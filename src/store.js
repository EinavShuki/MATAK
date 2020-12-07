import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { routeDetailsReducer } from "./reducers/routeDetailsReducers";

const reducer = combineReducers({
  routeDetails: routeDetailsReducer,
});

const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  // userLogin: {
  //   userInfo: userInfoFromLocalStorage,
  // },
  routeDetails: {
    routeType: "",
    isPermanent: false,
    positions: [],
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
