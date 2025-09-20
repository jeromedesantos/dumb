import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { Thread, ThreadAdd, ThreadInput } from "../molecules";
import { Alert, Header } from "../atoms";
import {
  removeThreads,
  addThreads,
  fetchThreads,
} from "../../redux/slices/threads";
import type { ThreadType } from "../../types/thread";
import type { AppDispatch, RootState } from "../../redux/store";
import { useEffect, useState } from "react";

const socketURL: string = import.meta.env.VITE_SOCKET_URL;

export function Threads() {
  const [hide, setHide] = useState(false);
  const {
    data: threads,
    status: threadsStatus,
    error: threadsError,
  } = useSelector((state: RootState) => state.threads);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchThreads());
    const socket = io(socketURL, {
      withCredentials: true,
    });
    socket.on("newThread", (newThread: ThreadType) => {
      dispatch(addThreads(newThread));
    });
    socket.on("deleteThread", ({ id }: { id: string }) => {
      dispatch(removeThreads(id));
    });
    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  return (
    <div className="w-full max-w-xl flex flex-col">
      <ThreadInput hide={hide} setHide={setHide} />
      <Header>Home</Header>
      <ThreadAdd
        placeholder="What is happening?!"
        disabled={true}
        onClick={() => setHide(!hide)}
      />
      {threadsStatus === "failed" && (
        <div className="py-5">
          <Alert variant="danger">{threadsError}</Alert>
        </div>
      )}
      {threadsStatus === "loading" && (
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
