import { useDispatch, useSelector } from "react-redux";
import { MoveLeft } from "lucide-react";
import { io } from "socket.io-client";
import { useEffect } from "react";
import { Reply, Thread, ThreadAdd } from "../molecules";
import { Alert, Header } from "../atoms";
import {
  fetchThreadById,
  setRepliesCount,
} from "../../redux/slices/threadById";
import {
  fetchReplies,
  addReplies,
  removeReplies,
} from "../../redux/slices/replies";
import { useNavigate } from "react-router-dom";
import type { ReplyType } from "../../types/reply";
import type { AppDispatch, RootState } from "../../redux/store";

const socketURL: string = import.meta.env.VITE_SOCKET_URL;

export function ThreadID({ id }: { id: string }) {
  const navigate = useNavigate();
  const {
    data: threadById,
    status: statusThreadById,
    error: errorThreadById,
  } = useSelector((state: RootState) => state.threadById);
  const {
    data: replies,
    status: statusReplies,
    error: errorReplies,
  } = useSelector((state: RootState) => state.replies);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchThreadById(id));
    dispatch(fetchReplies(id));
    const socket = io(socketURL, {
      withCredentials: true,
    });
    socket.on(
      "newReply",
      (payload: ReplyType & { thread_id: string; totalReplies: number }) => {
        dispatch(addReplies(payload));
        dispatch(
          setRepliesCount({
            threadId: payload.thread_id,
            count: payload.totalReplies,
          })
        );
      }
    );
    socket.on(
      "deleteReply",
      (payload: { id: string; thread_id: string; totalReplies: number }) => {
        dispatch(removeReplies(payload.id));
        dispatch(
          setRepliesCount({
            threadId: payload.thread_id,
            count: payload.totalReplies,
          })
        );
      }
    );
    return () => {
      socket.disconnect();
    };
  }, [dispatch, id]);

  return (
    <div className="w-full max-w-xl flex flex-col">
      <Header onClick={() => navigate("/")}>
        <MoveLeft size="30" />
        <p>Status</p>
      </Header>
      {statusThreadById === "failed" && (
        <div className="py-5">
          <Alert variant="danger">{errorThreadById}</Alert>
        </div>
      )}
      {statusThreadById === "loading" && (
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
      {threadById && (
        <Thread
          id={threadById.id}
          photo_profile={threadById.photo_profile}
          full_name={threadById.full_name}
          username={threadById.username}
          age={threadById.age}
          content={threadById.content}
          image={threadById.image}
          isLiked={threadById.isLiked}
          number_of_likes={threadById.number_of_likes}
          number_of_replies={threadById.number_of_replies}
          created_by={threadById.created_by}
        />
      )}
      {threadById && (
        <ThreadAdd threadId={threadById.id} placeholder="Type your reply!" />
      )}
      {statusReplies === "failed" && (
        <div className="py-5">
          <Alert variant="danger">{errorReplies}</Alert>
        </div>
      )}
      {statusReplies === "loading" && (
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
