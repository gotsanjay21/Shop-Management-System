import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Import Bootstrap (optional if using CDN in index.html)
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
