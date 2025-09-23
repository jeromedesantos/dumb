import { Profile } from "../molecules";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { fetchUserById, setUser } from "../../redux/slices/userById";
import { Alert } from "../atoms";
import type { UserType } from "../../types";

const socketURL: string = import.meta.env.VITE_SOCKET_URL;

export function SideProfile() {
  const { data } = useSelector((state: RootState) => state.token);
  const {
    data: user,
    status,
    error,
  } = useSelector((state: RootState) => state.userById);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (data?.id) dispatch(fetchUserById(data.id));
  }, [dispatch, data?.id]);

  useEffect(() => {
    const socket = io(socketURL, {
      withCredentials: true,
    });
    socket.on("updateUser", (updateUser: UserType) => {
      if (user?.id === updateUser.id) return dispatch(setUser(updateUser));
    });
    return () => {
      socket.disconnect();
    };
  }, [dispatch, user?.id]);

  return (
    <div className=" bg-zinc-950 w-full max-w-xs flex flex-col items-center">
      {status === "failed" && (
        <div className="py-5">
          <Alert variant="danger">{error}</Alert>
        </div>
      )}
      {status === "loading" && (
        <Profile
          id={""}
          full_name={"Loading.."}
          username={".."}
          email={".."}
          bio={".."}
          pending={true}
        />
      )}
      {user && (
        <Profile
          id={user.id}
          username={user.username}
          full_name={user.full_name}
          email={user.email}
          photo_profile={user.photo_profile}
          bio={user.bio}
        />
      )}
    </div>
  );
}
