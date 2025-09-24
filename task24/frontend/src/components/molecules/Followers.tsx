import type { FollowType } from "@/types";
import { Follow } from "../atoms/Follow";
import { useSelector } from "react-redux";
import { Alert } from "../atoms";
import type { RootState } from "../../redux/store";

export function Followers({ hidden = false }: { hidden?: boolean }) {
  const {
    data: followers,
    status: statusFollowers,
    error: errorFollowers,
  } = useSelector((state: RootState) => state.followers);

  return (
    <div className="bg-zinc-950 flex flex-col gap-5" hidden={hidden}>
      {statusFollowers === "failed" && (
        <div className="py-5">
          <Alert variant="danger">{errorFollowers}</Alert>
        </div>
      )}
      {statusFollowers === "loading" && (
        <Follow
          id={""}
          full_name={"Loading.."}
          username={".."}
          pending={true}
        />
      )}
      <div className="p-5 shadow-lg bg-zinc-900 flex gap-5">
        {followers &&
          followers.map((follow: FollowType) => (
            <Follow key={follow.id} {...follow} />
          ))}
      </div>
    </div>
  );
}
