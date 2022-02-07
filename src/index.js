import React from "react";
import ReactDOM from "react-dom";
import "grapesjs/dist/css/grapes.min.css";
import "bootstrap";
import App from "./App";
import "./styles/main.scss";
import reportWebVitals from "./reportWebVitals";
import DataProvider from "./redux/store";

ReactDOM.render(
  <React.StrictMode>
    <DataProvider>
      <App />
    </DataProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
