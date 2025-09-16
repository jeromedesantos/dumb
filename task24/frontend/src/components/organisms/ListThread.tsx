import { isAxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import { getThreads, threadsKeys } from "../../queries/threads";
import { Thread, ThreadAdd, ThreadInput } from "../molecules";
import { Alert } from "../atoms";
import type { ThreadType } from "../../types/thread";
import { useState } from "react";

export function ListThread() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: threadsKeys.all,
    queryFn: getThreads,
  });
  const [hide, setHide] = useState(false);

  return (
    <div className="w-full max-w-xl flex flex-col">
      <ThreadInput hide={hide} onClick={() => setHide(!hide)} />
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
        />
      )}
      {data &&
        data.data.map((thread: ThreadType) => (
          <Thread key={thread.id} {...thread} />
        ))}
    </div>
  );
}
