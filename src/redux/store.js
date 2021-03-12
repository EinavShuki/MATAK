import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './users'
import routesReducer from './routes'

export default configureStore({
  reducer: {
    users: usersReducer,
    routes: routesReducer
  }
})