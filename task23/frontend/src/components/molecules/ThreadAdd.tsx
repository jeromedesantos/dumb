import {
  useState,
  type ChangeEvent,
  type FormEvent,
  type MouseEvent,
  useRef,
} from "react";
import { isAxiosError } from "axios";
import { ImagePlus, X } from "lucide-react";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import type { RootState } from "../../redux/store";
import { Alert, Button } from "../atoms";
import { repliesKeys, postReplies } from "../../queries/reply";

export function ThreadAdd({
  threadId,
  placeholder,
  onClick,
  disabled = false,
}: {
  threadId?: string;
  placeholder?: string;
  onClick?: () => void;
  disabled?: boolean;
}) {
  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: repliesKeys.all,
    mutationFn: (formData: FormData) =>
      postReplies(formData, threadId as string),
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const { data } = useSelector((state: RootState) => state.token);
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
    if (content === "") return;
    const formData = new FormData();
    if (image) {
      formData.append("image", image);
    }
    formData.append("content", content);
    mutate(formData);
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
      fileInputRef.current.value = "";
    }
  }

  return (
    <form
      action="submit"
      onSubmit={handleSubmit}
      className={
        "w-full max-w-xl flex flex-col gap-5 cursor-text p-5 bg-zinc-900"
      }
      onClick={onClick}
    >
      {isError && (
        <Alert variant="danger">
          {isAxiosError(error) && error.response
            ? error.response.data.message
            : error.message}
        </Alert>
      )}
      <div
        className="flex gap-5 items-center
      "
      >
        {data && (
          <img
            src={userUrl}
            alt={`Image of ${data.username}`}
            className="w-8 h-8 rounded-full cursor-pointer"
          />
        )}
        <input
          className="text-zinc-300 placeholder:text-zinc-500 text-lg w-full outline-none bg-zinc-900 resize-none h-10 caret-[#04A51E] "
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={placeholder}
          readOnly={disabled}
        />
        <div className="flex items-center gap-5">
          <label className="flex w-full justify-between cursor-pointer">
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="image/*"
              disabled={disabled}
              onChange={handleImageChange}
            />
            <ImagePlus
              size="30"
              className="brightness-70 text-[#038318] cursor-pointer"
            />
          </label>
          <Button loading={isPending} disabled={disabled}>
            {disabled ? "Post" : "Reply"}
          </Button>
        </div>
      </div>
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
  );
}
