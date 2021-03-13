import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./users";
import createdRouteReducer from "./createdRouteReducer";

export default configureStore({
  reducer: {
    users: usersReducer,
    createdRoute: createdRouteReducer,
  },
});
