import {
  useState,
  type ChangeEvent,
  type FormEvent,
  type SetStateAction,
  type MouseEvent,
  useRef,
} from "react";
import { useMutation } from "@tanstack/react-query";
import { ImagePlus, X } from "lucide-react";
import { useSelector } from "react-redux";
import { isAxiosError } from "axios";
import { Alert, Button } from "../atoms";
import { postThread, threadsKeys } from "../../queries/threads";
import type { TokenStateType } from "../../types/tokenState";

export function ThreadInput({
  hide,
  setHide,
}: {
  hide: boolean;
  setHide: React.Dispatch<SetStateAction<boolean>>;
}) {
  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: threadsKeys.all,
    mutationFn: postThread,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const { data } = useSelector((state: TokenStateType) => state.token);
  const baseURL: string = import.meta.env.VITE_BASE_URL;
  const userUrl = data?.photo_profile
    ? `${baseURL}/uploads/user/${data.photo_profile}`
    : "/img/profile.jpg";

  function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.length ? e.target.files[0] : null;
    if (!file) return;
    setImage(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setBase64Image(reader.result);
      }
    };
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
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
    setBase64Image(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function handleClose(e: MouseEvent<SVGSVGElement>) {
    e.stopPropagation();
    setImage(null);
    setBase64Image(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Solusi
    }
  }

  function handleExit() {
    setHide(!hide);
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
          onClick={handleExit}
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
          action="submit"
          onSubmit={handleSubmit}
        >
          <div className="flex gap-5 w-full border-b-1 border-zinc-700 z-40">
            <img
              src={userUrl}
              alt={`Image of ${data?.username}`}
              className="w-8 h-8 rounded-full cursor-pointer"
            />
            <textarea
              placeholder="What is happening?!"
              value={content}
              className="placeholder:text-zinc-500 text-lg w-full outline-none text-zinc-300 bg-zinc-900 resize-none h-30 caret-[#04A51E]"
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <label className="flex w-full justify-between cursor-pointer">
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
            <ImagePlus
              size="30"
              className="brightness-70 text-[#04A51E] cursor-pointer"
            />
            <Button loading={isPending}>Post</Button>
          </label>
          {base64Image && (
            <div className="max-w-fit flex flex-col items-end">
              <X
                className="text-zinc-300 cursor-pointer relative top-7 right-2 rounded-full p-1 bg-zinc-900/30 hover:bg-zinc-900/50 duration-300"
                onClick={handleClose}
              />
              <img
                src={base64Image}
                alt={`Image of ${data?.username}`}
                className="rounded-xl object-cover"
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
