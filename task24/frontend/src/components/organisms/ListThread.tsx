import { useQuery } from "@tanstack/react-query";
import { getThreads, threadsKeys } from "../../queries/threads";
import { Alert, Thread } from "../atoms";
import { isAxiosError } from "axios";
import type { ThreadType } from "../../types/thread";

export function ListThread() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: threadsKeys.all,
    queryFn: getThreads,
  });

  return (
    <>
      {isError && (
        <Alert variant="danger">
          {isAxiosError(error) && error.response
            ? error.response.data.message
            : error.message}
        </Alert>
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
    </>
  );
}
