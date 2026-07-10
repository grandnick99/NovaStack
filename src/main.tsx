import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { LangProvider } from "./lib/LangContext";
import { ThemeProvider } from "./lib/ThemeContext";
import { ConsentProvider } from "./lib/ConsentContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <LangProvider>
        <ConsentProvider>
          <App />
        </ConsentProvider>
      </LangProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
