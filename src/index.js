import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import store from "./states/store";
import Initialization from "./views/base/Initialization";

ReactDOM.render(
  <Provider store={store}>
    <Initialization />
  </Provider>,
  document.getElementById("root")
);
