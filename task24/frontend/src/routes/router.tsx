import { createBrowserRouter } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Forgot from "../pages/Forgot";
import Reset from "../pages/Reset";
import Home from "../pages/Home";
import HomeID from "../pages/HomeID";
import NotFound from "../pages/NotFound";
import Private from "./Private";
import Public from "./Public";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Private>
        <Home />
      </Private>
    ),
  },
  {
    path: "/thread/:id",
    element: (
      <Private>
        <HomeID />
      </Private>
    ),
  },
  {
    path: "/register",
    element: (
      <Public>
        <Register />
      </Public>
    ),
  },
  {
    path: "/login",
    element: (
      <Public>
        <Login />
      </Public>
    ),
  },
  {
    path: "/forgot",
    element: (
      <Public>
        <Forgot />
      </Public>
    ),
  },
  {
    path: "/reset/:id",
    element: (
      <Public>
        <Reset />
      </Public>
    ),
  },
  { path: "*", element: <NotFound /> },
]);
