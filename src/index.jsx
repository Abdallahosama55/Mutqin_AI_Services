import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
// import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Provider } from "react-redux";
import store from "@/redux/store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);


reportWebVitals();
