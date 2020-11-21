import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "leaflet/dist/leaflet.css";
import App from "./App";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: "rgba(0, 0, 0, 0.6)",
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);
