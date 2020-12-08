import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import MyAccountScreen from "./screens/MyAccountScreen";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={LoginScreen} exact />
        <Route path="/home" component={HomeScreen} exact />
        <Route path="/my-account" component={MyAccountScreen} exact />
      </Switch>
    </Router>
  );
}
export default App;
