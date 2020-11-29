import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import PersonalArea from "./screens/PersonalArea"

function App() {
  return (
    <Router>
      <Route path="/" component={LoginScreen} exact/>
      <Route path="/home" component={HomeScreen} exact />
      <Route path="/personal-area" component={PersonalArea} axact/>
    </Router>
  );
}
export default App;
