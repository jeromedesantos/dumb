import type { ReplyType } from "../../types/reply";

export function Reply({
  photo_profile = "./img/profile.jpg",
  full_name,
  username,
  age,
  content,
  image,
  pending = false,
}: ReplyType) {
  const baseURL: string = import.meta.env.VITE_BASE_URL;
  const userUrl = photo_profile
    ? `${baseURL}/uploads/user/${photo_profile}`
    : "/img/profile.jpg";
  const threadUrl = image ? `${baseURL}/uploads/thread/${image}` : "";

  return (
    <div
      className={`pl-15 border-b-1 p-5 border-zinc-700 shadow-lg bg-zinc-900 flex gap-5 cursor-pointer ${
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
      </div>
    </div>
  );
}
