import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./Components/App/App.jsx";
import { StateProvider } from "./StateProvider";
import reducer, { initialState } from "./Reducer";
import Login from "./Components/Login/Login.css";

ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
