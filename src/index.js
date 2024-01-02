import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "../src/components/App/App";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "../src/contexts/Authcontext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
