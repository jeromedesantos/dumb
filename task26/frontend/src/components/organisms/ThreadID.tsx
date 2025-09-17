import { isAxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import { getThreadById, threadsKeys } from "../../queries/threads";
import { getReplyById, repliesKeys } from "../../queries/reply";
import { Reply, Thread } from "../molecules";
import { Alert, Header } from "../atoms";
import type { ReplyType } from "../../types/reply";
import { MoveLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

// import {
//   useEffect,
//   useState,
// } from "react";
// import { io } from "socket.io-client";
// import { queryClient } from "@/lib/queryClient";
// import type { ThreadType } from "../../types/thread";

// const socketURL: string = import.meta.env.VITE_SOCKET_URL;

export function ThreadID({ id }: { id: string }) {
  const {
    data: thread,
    isPending: isPendingThread,
    isError: isErrorThread,
    error: errorThread,
  } = useQuery({
    queryKey: threadsKeys.detail(id),
    queryFn: () => getThreadById(id),
    enabled: !!id,
  });
  const {
    data: replies,
    isPending: isPendingReply,
    isError: isErrorReply,
    error: errorReply,
  } = useQuery({
    queryKey: repliesKeys.detail(id),
    queryFn: () => getReplyById(id),
    enabled: !!id,
  });
  const navigate = useNavigate();
  // useEffect(() => {
  //   const socket = io(socketURL, {
  //     withCredentials: true,
  //   });
  //   socket.on("newThread", (newThread: ThreadType) => {
  //     queryClient.setQueryData<{ data: ThreadType[] }>(
  //       threadsKeys.all,
  //       (oldData) => {
  //         if (!oldData) {
  //           return { data: [newThread] };
  //         }
  //         return {
  //           ...oldData,
  //           data: oldData?.data ? [newThread, ...oldData.data] : [newThread],
  //         };
  //       }
  //     );
  //   });
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  return (
    <div className="w-full max-w-xl flex flex-col">
      <Header onClick={() => navigate("/")}>
        <MoveLeft size="30" />
        <p>Status</p>
      </Header>
      {isErrorThread && (
        <div className="py-5">
          <Alert variant="danger">
            {isAxiosError(errorThread) && errorThread.response
              ? errorThread.response.data.message
              : errorThread.message}
          </Alert>
        </div>
      )}
      {isPendingThread && (
        <Thread
          id={"00"}
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
      {thread && (
        <Thread
          id={thread.id}
          photo_profile={thread.photo_profile}
          full_name={thread.full_name}
          username={thread.username}
          age={thread.age}
          content={thread.content}
          image={thread.image}
          number_of_likes={thread.number_of_likes}
          number_of_replies={thread.number_of_replies}
        />
      )}
      {isErrorReply && (
        <div className="py-5">
          <Alert variant="danger">
            {isAxiosError(errorReply) && errorReply.response
              ? errorReply.response.data.message
              : errorReply.message}
          </Alert>
        </div>
      )}
      {isPendingReply && (
        <Reply
          id={"00"}
          photo_profile={"./img/profile.jpg"}
          full_name={"Loading.."}
          username={"Loading.."}
          age={"Loading.."}
          content={"Loading.."}
          image={null}
          pending={true}
        />
      )}
      {replies &&
        replies.map((reply: ReplyType) => <Reply key={reply.id} {...reply} />)}
    </div>
  );
}
