import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { routeDetailsReducer } from "./reducers/routeDetailsReducers";
import { userReducer } from "./reducers/userReducer";

const reducer = combineReducers({
  routeDetails: routeDetailsReducer,
  userInfo: userReducer,
});

const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userInfo: { userInfoFromLocalStorage },

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
