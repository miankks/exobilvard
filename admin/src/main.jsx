import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import AppProviders from "./context/AppProviders.jsx";

const API_URL = import.meta.env.VITE_API_URL;

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppProviders url={API_URL}>
      <App />
    </AppProviders>
  </BrowserRouter>
);
