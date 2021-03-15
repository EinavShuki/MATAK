import { configureStore } from "@reduxjs/toolkit";
import { reducer as formReducer } from "redux-form";
import usersReducer from "./users";
import routesReducer from "./routes";

export default configureStore({
  reducer: {
    users: usersReducer,
    routes: routesReducer,
    form: formReducer,
  },
});
