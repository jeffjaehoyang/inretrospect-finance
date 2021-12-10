import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import GlobalStyles from "./styles/globalStyles";
import "./styles/tailwind.output.css";

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
