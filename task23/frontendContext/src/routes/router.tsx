import { createBrowserRouter } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Forgot from "../pages/Forgot";
import Reset from "../pages/Reset";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import { PrivateRoute } from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    ),
  },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
  { path: "/forgot", element: <Forgot /> },
  { path: "/reset", element: <Reset /> },
  { path: "*", element: <NotFound /> },
]);
