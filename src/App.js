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
        <Route path="/my-account" component={MyAccountScreen} axact />
      </Switch>
    </Router>
  );
}
export default App;

{
  /* <BrowserRouter>
      <Switch>
        <Route path="/" axact>
          <LoginScreen />
        </Route>
        <Route path="/home" axact>
          <HomeScreen />
        </Route>
        <Route path="/my-account">
          <MyAccountScreen />
        </Route>
      </Switch>
    </BrowserRouter> */
}
