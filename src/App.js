import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import MyAccountScreen from "./screens/MyAccountScreen";
import AdminScreen from "./screens/AdminScreen";
import Notifications from "./screens/Notification";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={LoginScreen} exact />
        <Route path="/home" component={HomeScreen} />
        <Route path="/my-account" component={MyAccountScreen} />
        <Route path="/admin-panel" component={AdminScreen} />
        <Route path="/notifications" component={Notifications} />
      </Switch>
    </Router>
  );
}
export default App;
