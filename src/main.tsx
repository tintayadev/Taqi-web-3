import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, redirect } from "react-router-dom";
import App from "./App";
import { Web3Provider } from "./providers/Web3Provider";
import "./index.css"; // <-- Tailwind entry

import Pagina1 from "./pages/Pagina1";
import Pagina2 from "./pages/Pagina2";
import Pagina3 from "./pages/Pagina3";
import Pagina4 from "./pages/Pagina4";
import Pagina5 from "./pages/Pagina5";
import Pagina6 from "./pages/Pagina6";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Pagina1 /> },
      { path: "home", element: <Pagina1 /> },
      { path: "location", element: <Pagina2 /> },
      { path: "routes", element: <Pagina3 /> },
      { path: "nfts", element: <Pagina4 /> },
      { path: "events", element: <Pagina5 /> },
      { path: "tucredits", element: <Pagina6 /> },
      { path: "*", loader: () => redirect("/home") },
    ],
  },
]);

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("No se encontró el div root");

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Web3Provider>
      <RouterProvider router={router} />
    </Web3Provider>
  </React.StrictMode>
);
