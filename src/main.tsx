import React from "react";
import ReactDOM from "react-dom/client";
import MainPage from "./components/MainPage.tsx";
import "normalize.css";
import "./styles.scss";

const root = document.getElementById("root")!;
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <MainPage />
  </React.StrictMode>,
);
