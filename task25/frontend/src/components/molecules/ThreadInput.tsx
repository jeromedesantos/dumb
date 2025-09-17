import { ImagePlus, X } from "lucide-react";
import { Alert, Button } from "../atoms";
import { useState, type SetStateAction } from "react";
import { useMutation } from "@tanstack/react-query";
import { postThreads, threadsKeys } from "@/queries/threads";
import { isAxiosError } from "axios";

export function ThreadInput({
  hide,
  setHide,
}: {
  hide: boolean;
  setHide: React.Dispatch<SetStateAction<boolean>>;
}) {
  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: threadsKeys.all,
    mutationFn: postThreads,
  });
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData();
    if (image) {
      formData.append("image", image);
    }
    formData.append("content", content);
    mutate(formData);
    setHide(!hide);
    setContent("");
    setImage(null);
  }

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
          onClick={() => setHide(!hide)}
        />
        {isError && (
          <Alert variant="danger">
            {isAxiosError(error) && error.response
              ? error.response.data.message
              : error.message}
          </Alert>
        )}
        <form
          className="flex flex-col gap-5"
          action="submits"
          onSubmit={handleSubmit}
        >
          <div className="flex gap-5 w-full border-b-1 border-zinc-700 z-40">
            <img
              src={"./img/profile.jpg"}
              alt={`Image of ${"./img/profile.jpg"}`}
              className="w-8 h-8 rounded-full cursor-pointer"
            />
            <textarea
              placeholder="What is happening?!"
              value={content}
              className="placeholder:text-zinc-500 text-lg w-full outline-none text-zinc-300 bg-zinc-900 resize-none h-30 caret-[#04A51E]"
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="flex justify-between items-center gap-5">
            <label className="cursor-pointer">
              <input
                type="file"
                className="hidden" // disembunyiin
                onChange={(e) => e.target.files && setImage(e.target.files[0])}
              />
              <ImagePlus
                size="30"
                className="brightness-70 text-[#04A51E] cursor-pointer"
              />
            </label>
            <Button loading={isPending}>Post</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
