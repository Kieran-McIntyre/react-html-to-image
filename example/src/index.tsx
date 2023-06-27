import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "@example/App";
import "@example/index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <main className="flex items-center justify-center h-screen w-screen">
      <App />
    </main>
  </React.StrictMode>
);
