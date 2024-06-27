import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Create from "./components/Create.jsx";
import Edit from "./components/Edit.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/create", element: <Create /> },
  { path: "/edit/:id", element: <Edit /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
