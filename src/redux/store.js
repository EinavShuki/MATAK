import { configureStore } from "@reduxjs/toolkit";
import { reducer as formReducer } from "redux-form";
import usersReducer from "./users";
import createdRouteReducer from "./createdRoute";

export default configureStore({
  reducer: {
    users: usersReducer,
    createdRoute: createdRouteReducer,
    form: formReducer,
  },
});
