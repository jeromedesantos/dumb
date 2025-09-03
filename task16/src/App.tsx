import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./assets/css/style.css";
import { Button } from "./components/ui/button";
import Home from "./pages/Home";
import About from "./pages/About";
import Posts from "./pages/Posts";
import PostDetail from "./pages/PostDetail";

function App() {
  return (
    <BrowserRouter>
      <div className="w-full min-h-screen bg-gray-100">
        <div className="flex item-center justify-center backdrop-blur-sm bg-white w-full py-5 shadow-lg text-2xl sticky top-0 z-20">
          <div className="w-3/4 flex items-center justify-between">
            <div>
              <h1 className="font-play font-semibold text-[#D71920]">post ✿</h1>
            </div>
            <div className="font-inter flex gap-5 font-semibold  text-gray-600">
              <Button asChild variant="ghost">
                <Link to="/">Home</Link>
              </Button>
              <Button asChild variant="ghost">
                <Link to="/about">About</Link>
              </Button>
              <Button asChild variant="ghost">
                <Link to="/posts">Posts</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center mt-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/posts" element={<Posts />}>
              <Route path=":postId" element={<PostDetail />} />
            </Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
