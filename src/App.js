import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";

function App() {
  return (
    <Router>
      <Route path="/" component={LoginScreen} exact/>
      <Route path="/home" component={HomeScreen} exact />
    </Router>
  );
}
export default App;
