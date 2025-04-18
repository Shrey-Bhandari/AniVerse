import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import WatchPage from "./Pages/WatchPage";



ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
     <WatchPage />
  </BrowserRouter>
);