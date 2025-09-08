import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import ContextRoute from "@/routes/ContextRoute";

export const router = createBrowserRouter([
  {
    element: <ContextRoute />, // 👈 Provider di sini
    children: [
      { path: "/", element: <Home /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
