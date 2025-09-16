import { Heart, MessageSquareText } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import type { ThreadType } from "../../types/thread";

export function Thread({
  photo_profile,
  full_name,
  username,
  age_interval,
  content,
  image,
  number_of_likes,
  number_of_replies,
  pending = false,
}: ThreadType) {
  const [isLiked, setIsLiked] = useState(false);
  const [newLikes, setNewLikes] = useState(number_of_likes);
  const baseURL: string = import.meta.env.VITE_BASE_URL;
  const userUrl = photo_profile
    ? `${baseURL}/uploads/user/${photo_profile}`
    : "./img/profile.jpg";
  const threadUrl = `${baseURL}/uploads/thread/${image}`;
  const age = age_interval?.split(" ") ?? [];
  const date = `${age[0]} ${age[1]}`;

  function handleToggleLike() {
    setNewLikes((prevLikes) => (isLiked ? prevLikes - 1 : prevLikes + 1));
    setIsLiked(!isLiked);
  }

  return (
    <div
      className={`border-y-1 p-5 border-zinc-700 shadow-lg bg-zinc-900 flex gap-5 ${
        pending && "brightness-50 animate-pulse"
      }`}
    >
      <img
        src={userUrl ?? userUrl}
        alt="Profile"
        className="w-8 h-8 rounded-full"
      />
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <div className="text-sm font-bold text-zinc-300">{full_name}</div>
          <div className="text-sm text-zinc-500">{username}</div>
          <div className="text-sm text-zinc-500">●</div>
          <div className="text-sm text-zinc-500">{date}</div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm text-zinc-300">{content}</p>
          <Link to={image ?? ""} className="cursor-pointer">
            <img
              src={threadUrl}
              alt="Profile"
              className="w-full rounded-xl"
              hidden={image ? false : true}
            />
          </Link>
        </div>
        <div className="flex gap-5">
          <div className="flex items-center gap-2">
            <Heart
              className={`cursor-pointer text-zinc-500 ${
                isLiked && "fill-zinc-500"
              }`}
              onClick={handleToggleLike}
            />
            <p className="text-sm text-zinc-500">{newLikes}</p>
          </div>
          <div className="flex items-center gap-2">
            <MessageSquareText className="text-zinc-500" />
            <p className="text-sm text-zinc-500">{number_of_replies} Replies</p>
          </div>
        </div>
      </div>
      -
    </div>
  );
}
