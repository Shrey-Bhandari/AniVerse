import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Remove the extra BrowserRouter import and WatchPage import
// Remove the BrowserRouter wrapper as it's already in App.jsx

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
     <App />
  </React.StrictMode>
);