import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { deleteReply, repliesKeys } from "../../queries/reply";
import type { AppDispatch, RootState } from "../../redux/store";
import { ButtonTrash } from "../atoms/ButtonTrash";
import { isAxiosError } from "axios";
import { Alert } from "../atoms";
import { useEffect } from "react";
import { removeReplies } from "../../redux/slices/replies";
import { io } from "socket.io-client";
const socketURL: string = import.meta.env.VITE_SOCKET_URL;

export function Reply({
  id,
  photo_profile,
  full_name,
  username,
  age,
  content,
  image,
  created_by,
  pending = false,
}: {
  id: string;
  photo_profile: string | null;
  full_name: string;
  username: string | null;
  age: string | null;
  content: string | null;
  image: string | null;
  created_by?: string;
  pending?: boolean;
}) {
  const baseURL: string = import.meta.env.VITE_BASE_URL;
  const userUrl = photo_profile
    ? `${baseURL}/uploads/user/${photo_profile}`
    : "/img/profile.jpg";
  const replyUrl = image ? `${baseURL}/uploads/reply/${image}` : "";
  const { data } = useSelector((state: RootState) => state.token);
  const { mutate, isPending, isError, error } = useMutation<
    void,
    Error,
    string
  >({
    mutationKey: repliesKeys.all,
    mutationFn: (id: string) => deleteReply(id),
  });
  const dispatch: AppDispatch = useDispatch();

  function handleDelete(id: string) {
    mutate(id);
  }
  useEffect(() => {
    const socket = io(socketURL, {
      withCredentials: true,
    });
    socket.on("deleteReply", ({ id }: { id: string }) => {
      dispatch(removeReplies(id));
    });
  }, [dispatch, id]);

  return (
    <div
      className={`pl-15 border-b-1 p-5 border-zinc-700 shadow-lg bg-zinc-900 flex gap-5 cursor-pointer ${
        pending && "brightness-50 animate-pulse"
      }`}
    >
      {isError && (
        <Alert variant="danger">
          {isAxiosError(error) && error.response && error.response.data.message}
        </Alert>
      )}
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
          <p className="text-sm text-zinc-300 whitespace-pre-wrap">{content}</p>
          {image && (
            <a
              href={replyUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="cursor-pointer"
            >
              <img
                src={replyUrl}
                alt={`Image of ${content}`}
                className="w-full rounded-xl"
              />
            </a>
          )}
        </div>
      </div>
      {data && data.id === created_by && (
        <ButtonTrash
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(id);
          }}
          disabled={isPending}
        />
      )}
    </div>
  );
}
