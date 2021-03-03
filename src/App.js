import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import MyAccountScreen from "./screens/MyAccountScreen";
import AdminScreen from "./screens/AdminScreen"

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={LoginScreen} exact />
        <Route path="/home" component={HomeScreen} exact />
        <Route path="/my-account" component={MyAccountScreen} exact />
        <Route path="/admin-panel" component={AdminScreen} exact />
      </Switch>
    </Router>
  );
}
export default App;
