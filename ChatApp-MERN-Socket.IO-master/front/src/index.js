import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { UserProfileProvider } from "./Pages/UserProfileContext";
import 'bootstrap/dist/css/bootstrap.min.css';



ReactDOM.render(
    <UserProfileProvider><App /></UserProfileProvider>
    , document.getElementById("root"));
