import { isAxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import { getThreads, threadsKeys } from "../../queries/threads";
import { Thread, ThreadAdd, ThreadInput } from "../molecules";
import { Alert } from "../atoms";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { queryClient } from "@/lib/queryClient";
import type { ThreadType } from "../../types/thread";

const socketURL: string = import.meta.env.VITE_SOCKET_URL;

export function ListThread() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: threadsKeys.all,
    queryFn: getThreads,
  });
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const socket = io(socketURL, {
      withCredentials: true,
    });
    socket.on("newThread", (newThread: ThreadType) => {
      queryClient.setQueryData<{ data: ThreadType[] }>(
        threadsKeys.all,
        (oldData) => {
          if (!oldData) {
            return { data: [newThread] };
          }
          return {
            ...oldData,
            data: oldData?.data ? [newThread, ...oldData.data] : [newThread],
          };
        }
      );
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="w-full max-w-xl flex flex-col">
      <ThreadInput hide={hide} setHide={setHide} />
      <div className="pt-10 px-5 items-center border-zinc-300 bg-zinc-900">
        <h1 className="text-2xl font-bold text-zinc-300">Home</h1>
      </div>
      <ThreadAdd onClick={() => setHide(!hide)} />
      {isError && (
        <div className="py-5">
          <Alert variant="danger">
            {isAxiosError(error) && error.response
              ? error.response.data.message
              : error.message}
          </Alert>
        </div>
      )}
      {isPending && (
        <Thread
          id={"00"}
          photo_profile={"./img/profile.jpg"}
          full_name={"Loading.."}
          username={"Loading.."}
          age_interval={"Loading.."}
          content={"Loading.."}
          image={null}
          number_of_likes={0}
          number_of_replies={0}
          pending={true}
          data={null}
        />
      )}
      {data &&
        data.data.map((thread: ThreadType) => (
          <Thread key={thread.id} {...thread} />
        ))}
    </div>
  );
}
