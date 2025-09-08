import { RouterProvider } from "react-router-dom";
import { router } from "./lib/router";
import "./App.css";

export default function App() {
  return <RouterProvider router={router} />;
}
