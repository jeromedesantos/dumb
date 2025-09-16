import { ImagePlus, X } from "lucide-react";
import { Button } from "../atoms";

export function ThreadInput({
  hide,
  onClick,
}: {
  hide: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={`w-full min-h-screen flex flex-col justify-center bg-zinc-950/70 fixed z-20
        ${hide ? "" : "hidden"}  
     `}
    >
      <div
        className={`w-full max-w-xl flex flex-col gap-5 cursor-text p-5 border-zinc-300 bg-zinc-900 rounded-xl z-40
       
    `}
      >
        <X
          className="text-zinc-300 self-end p-1 -mb-5 rounded-full border-2 border-zinc-300 cursor-pointer"
          onClick={onClick}
        />
        <div className="flex gap-5 w-full border-b-1 border-zinc-700 z-40">
          <img
            src={"./img/profile.jpg"}
            alt={`Image of ${"./img/profile.jpg"}`}
            className="w-8 h-8 rounded-full cursor-pointer"
          />
          <textarea
            placeholder="What is happening?!"
            className="placeholder:text-zinc-500 text-lg w-full outline-none text-zinc-300 bg-zinc-900 resize-none h-30 caret-[#04A51E]"
          />
        </div>
        <div className="flex justify-between items-center gap-5">
          <ImagePlus
            size="30"
            className="brightness-70 text-[#04A51E] cursor-pointer"
          />
          <Button>Post</Button>
        </div>
      </div>
    </div>
  );
}
