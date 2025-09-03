import { useParams } from "react-router-dom";
import posts from "../data/posts.json";

export default function PostDetail() {
  const { postId } = useParams();
  const post = posts.find((post) => post.id == parseInt(postId || ""));
  return (
    <div className="w-1/2 text-justify flex flex-col gap-5 bg-white shadow-lg p-10 rounded-2xl">
      <h1 className="text-2xl font-bold">{post?.title}</h1>
      <p>{post?.body}</p>
    </div>
  );
}
