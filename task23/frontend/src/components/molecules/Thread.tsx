import { Heart, MessageSquareText } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { Alert } from "../atoms";
import { ButtonTrash } from "../atoms/ButtonTrash";
import { likesKeys, postLike } from "../../queries/like";
import { deleteThread, threadsKeys } from "../../queries/thread";
import { removeThread } from "../../redux/slices/threadById";
import { io } from "socket.io-client";
const socketURL: string = import.meta.env.VITE_SOCKET_URL;
import type { AppDispatch, RootState } from "../../redux/store";

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
  created_by,
  pending = false,
}: {
  id: string;
  photo_profile?: string | null;
  full_name: string;
  username?: string | null;
  age?: string | null;
  content?: string | null;
  image?: string | null;
  number_of_likes: number;
  number_of_replies: number;
  created_by?: string;
  pending?: boolean;
}) {
  const navigate = useNavigate();
  const [, setIsLiked] = useState<string | null>(null);
  const [newLikes, setNewLikes] = useState(number_of_likes);
  const {
    mutate: mutateLike,
    isPending: isPendingLike,
    isError: isErrorLike,
    error: errorLike,
  } = useMutation({
    mutationKey: likesKeys.all,
    mutationFn: () => postLike(id as string),
  });
  const { mutate, isPending, isError, error } = useMutation<
    void,
    Error,
    string
  >({
    mutationKey: threadsKeys.all,
    mutationFn: (id: string) => deleteThread(id),
  });
  const baseURL: string = import.meta.env.VITE_BASE_URL;
  const userUrl = photo_profile
    ? `${baseURL}/uploads/user/${photo_profile}`
    : "/img/profile.jpg";
  const threadUrl = image ? `${baseURL}/uploads/thread/${image}` : "";
  const { data } = useSelector((state: RootState) => state.token);
  const dispatch: AppDispatch = useDispatch();

  function handleDelete(id: string) {
    if (mutate) {
      mutate(id);
      navigate("/");
    }
  }

  function handleToggleLike(id: string) {
    setNewLikes((prevLikes) => (prevLikes ? prevLikes - 1 : prevLikes + 1));
    setIsLiked(id);
    mutateLike();
  }

  function handleCardClick() {
    if (!pending) {
      navigate(`/thread/${id}`);
    }
  }

  useEffect(() => {
    const socket = io(socketURL, {
      withCredentials: true,
    });
    socket.on("deleteThread", () => {
      dispatch(removeThread());
    });
    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  return (
    <div
      onClick={handleCardClick}
      className={`border-b-1 p-5 border-zinc-700 shadow-lg bg-zinc-900 flex gap-5 cursor-pointer ${
        pending && "brightness-50 animate-pulse"
      }`}
    >
      {isError && (
        <Alert variant="danger">
          {isAxiosError(error) && error.response && error.response.data.message}
        </Alert>
      )}
      {isErrorLike && (
        <Alert variant="danger">
          {isAxiosError(errorLike) &&
            errorLike.response &&
            errorLike.response.data.message}
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
          <button className="flex items-center gap-2" disabled={isPendingLike}>
            <Heart
              className={`cursor-pointer text-zinc-500 ${
                newLikes > 0 && "fill-zinc-500"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                handleToggleLike(id);
              }}
            />
            <p className="text-sm text-zinc-500">{newLikes}</p>
          </button>
          <div className="flex items-center gap-2">
            <MessageSquareText className="text-zinc-500" />
            <p className="text-sm text-zinc-500">{number_of_replies} Replies</p>
          </div>
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
