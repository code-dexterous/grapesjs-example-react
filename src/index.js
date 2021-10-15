import React from "react";
import ReactDOM from "react-dom";
import "grapesjs/dist/css/grapes.min.css";
import "bootstrap";
import App from "./App";
import "./styles/main.scss";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
