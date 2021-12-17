import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css"

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Fragment>
    <App />

    </Fragment>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
