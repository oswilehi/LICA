import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.js";
import "./index.css";
import amplify from "aws-amplify";
import key from "./key";
import Main from "./components/Main";

amplify.configure(key.AmplifyConfig);

ReactDOM.render(<Main />, document.getElementById("root"));

reportWebVitals();
