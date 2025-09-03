import { Link, Outlet } from "react-router-dom";
import posts from "../data/posts.json";
import { Button } from "../components/ui/button";

export default function Posts() {
  return (
    <div className="flex flex-col items-center gap-10 ">
      <ul className="flex gap-5">
        {posts.map((post) => (
          <li key={post.id} className="font-semibold  text-gray-600">
            <Button asChild variant="outline">
              <Link to={`/posts/${post.id.toString()}`}>{post.title}</Link>
            </Button>
          </li>
        ))}
      </ul>
      <Outlet />
    </div>
  );
}
