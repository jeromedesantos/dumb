import { useSelector } from "react-redux";
import { ImagePlus } from "lucide-react";
import { Button } from "../atoms";
import type { TokenStateType } from "../../types/tokenState";

export function ThreadAdd({ onClick }: { onClick?: () => void }) {
  const { data } = useSelector((state: TokenStateType) => state.token);
  const baseURL: string = import.meta.env.VITE_BASE_URL;
  const userUrl = data?.photo_profile
    ? `${baseURL}/uploads/user/${data.photo_profile}`
    : "/img/profile.jpg";

  return (
    <div
      className={
        "w-full max-w-xl flex items-center gap-5 cursor-text p-5 bg-zinc-900"
      }
      onClick={onClick}
    >
      {data && (
        <img
          src={userUrl}
          alt={`Image of ${data.username}`}
          className="w-8 h-8 rounded-full cursor-pointer"
        />
      )}
      <h1 className="text-zinc-500 text-lg w-full outline-none bg-zinc-900 resize-none h-10 caret-[#04A51E] ">
        What is happening?!
      </h1>
      <ImagePlus
        size="50"
        className="brightness-70 text-[#038318] cursor-pointer"
      />
      <Button disabled={true}>Post</Button>
    </div>
  );
}
