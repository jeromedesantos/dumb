import { ImagePlus } from "lucide-react";
import { Button } from "../atoms";

export function ThreadAdd({ onClick }: { onClick?: () => void }) {
  return (
    <>
      <div
        className={
          "w-full max-w-xl flex items-center gap-5 cursor-text p-5 bg-zinc-900"
        }
        onClick={onClick}
      >
        <img
          src={"./img/profile.jpg"}
          alt={`Image of ${"./img/profile.jpg"}`}
          className="w-8 h-8 rounded-full cursor-pointer"
        />
        <h1 className="text-zinc-500 text-lg w-full outline-none bg-zinc-900 resize-none h-10 caret-[#04A51E] ">
          What is happening?!
        </h1>
        <ImagePlus
          size="50"
          className="brightness-70 text-[#038318] cursor-pointer"
        />
        <Button disabled={true}>Post</Button>
      </div>
    </>
  );
}
