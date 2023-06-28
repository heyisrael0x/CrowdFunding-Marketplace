import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { StateContextProvider } from "./context";
import { MoralisProvider } from "react-moralis";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MoralisProvider initializeOnMount={false}>
      <Router>
        <StateContextProvider>
          <App />
        </StateContextProvider>
      </Router>
    </MoralisProvider>
  </React.StrictMode>
);
