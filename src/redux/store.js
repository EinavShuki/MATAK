import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./users";
import createdRouteReducer from "./createdRoute";
import userRoutesReducer from "./userRoutes";

export default configureStore({
  reducer: {
    users: usersReducer,
    createdRoute: createdRouteReducer,
    userRoutes: userRoutesReducer,
  },
});
