import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { queryClient } from "./lib/queryClient";
import { AuthProvider } from "./context/AuthProvider";
import "./App.css";

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black font-plus text-sm">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </div>
  );
}
