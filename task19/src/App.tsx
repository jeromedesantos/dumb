import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { RecoilRoot } from "recoil";
import { useSearch } from "@/hooks/useSearch";
import { useDebounce } from "@/hooks/useDebounce";
import { Navbar, Footer } from "@/components/molecules";
import { Login, NotFound, Movies, MovieDetail } from "./pages";
import { PublicRoute, PrivateRoute } from "./routes";
import "./App.css";

export const App = () => {
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce<string>(search, 500);
  const { data, isLoading, isError } = useSearch(debouncedSearch);

  return (
    <RecoilRoot>
      <Router>
        <Navbar />
        <div className=" dark:bg-zinc-950 bg-white w-full min-h-screen font-ubuntu flex flex-col items-center justify-center">
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Movies
                    search={search}
                    debouncedSearch={debouncedSearch}
                    setSearch={setSearch}
                    data={data}
                    isLoading={isLoading}
                    isError={isError}
                  />
                </PrivateRoute>
              }
            >
              <Route
                path=":movieId"
                element={
                  <PrivateRoute>
                    <MovieDetail data={data} />
                  </PrivateRoute>
                }
              />
            </Route>
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </RecoilRoot>
  );
};
