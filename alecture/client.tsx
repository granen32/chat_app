import "core-js/stable";
import "regenerator-runtime/runtime";
import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
// import SWRDevtools from '@jjordy/swr-devtools';

import App from "./layouts/App";

axios.defaults.withCredentials = true;
axios.defaults.baseURL =
  process.env.NODE_ENV === "production"
    ? "http://localhost:3095"
    : "http://localhost:3090";
console.log("env", process.env.NODE_ENV === "production");

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.querySelector("#app")
);
