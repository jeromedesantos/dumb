import { isAxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import { getThreads, threadsKeys } from "../../queries/threads";
import { Thread, ThreadAdd, ThreadInput } from "../molecules";
import { Alert, Header } from "../atoms";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { queryClient } from "@/lib/queryClient";
import type { ThreadType } from "../../types/thread";

const socketURL: string = import.meta.env.VITE_SOCKET_URL;

export function Threads() {
  const {
    data: threads,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: threadsKeys.all,
    queryFn: getThreads,
  });
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const socket = io(socketURL, {
      withCredentials: true,
    });
    socket.on("newThread", (newThread: ThreadType) => {
      queryClient.setQueryData<ThreadType[]>(threadsKeys.all, (oldData) => {
        if (!oldData) return [newThread];
        return [newThread, ...oldData];
      });
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="w-full max-w-xl flex flex-col">
      <ThreadInput hide={hide} setHide={setHide} />
      <Header>Home</Header>
      <ThreadAdd
        placeholder="What is happening?!"
        disabled={true}
        onClick={() => setHide(!hide)}
      />
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
          age={"Loading.."}
          content={"Loading.."}
          image={null}
          number_of_likes={0}
          number_of_replies={0}
          pending={true}
        />
      )}
      {threads &&
        threads.map((thread: ThreadType) => (
          <Thread key={thread.id} {...thread} />
        ))}
    </div>
  );
}
