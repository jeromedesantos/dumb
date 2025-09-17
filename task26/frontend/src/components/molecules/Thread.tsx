import { Heart, MessageSquareText } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { MouseEvent } from "react";
import type { ThreadType } from "../../types/thread";

export function Thread({
  id,
  photo_profile,
  full_name,
  username,
  age,
  content,
  image,
  number_of_likes,
  number_of_replies,
  pending = false,
}: ThreadType) {
  const [isLiked, setIsLiked] = useState(false);
  const [newLikes, setNewLikes] = useState(number_of_likes);
  const navigate = useNavigate();
  const baseURL: string = import.meta.env.VITE_BASE_URL;
  const userUrl = photo_profile
    ? `${baseURL}/uploads/user/${photo_profile}`
    : "/img/profile.jpg";
  const threadUrl = image ? `${baseURL}/uploads/thread/${image}` : "";

  function handleToggleLike(e: MouseEvent<SVGSVGElement>) {
    e.preventDefault();
    e.stopPropagation();
    setNewLikes((prevLikes) => (isLiked ? prevLikes - 1 : prevLikes + 1));
    setIsLiked(!isLiked);
  }

  function handleCardClick() {
    if (!pending) {
      navigate(`/thread/${id}`);
    }
  }

  return (
    <div
      onClick={handleCardClick}
      className={`border-b-1 p-5 border-zinc-700 shadow-lg bg-zinc-900 flex gap-5 cursor-pointer ${
        pending && "brightness-50 animate-pulse"
      }`}
    >
      <img
        src={userUrl}
        alt={`Image of ${userUrl}`}
        className="w-8 h-8 rounded-full"
      />
      <div className="flex flex-col gap-3 w-full">
        <div className="flex items-center gap-2">
          <div className="text-sm font-bold text-zinc-300">{full_name}</div>
          <div className="text-sm text-zinc-500">@{username}</div>
          <div className="text-sm text-zinc-500">●</div>
          <div className="text-sm text-zinc-500">{age}</div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm text-zinc-300">{content}</p>
          {image && (
            <a
              href={threadUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="cursor-pointer"
            >
              <img
                src={threadUrl}
                alt={`Image of ${threadUrl}`}
                className="w-full rounded-xl"
              />
            </a>
          )}
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
    </div>
  );
}
