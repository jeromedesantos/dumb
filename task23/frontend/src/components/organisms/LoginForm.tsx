import { Link, useNavigate } from "react-router-dom";
import { useState, type FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { usersKeys, loginUser } from "../../queries/users";
import { Input, Button, Error } from "../atoms";
import { FormGroup } from "../molecules";

export function LoginForm() {
  const navigate = useNavigate();
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: usersKeys.all,
    mutationFn: loginUser,
    onSuccess: () => {
      navigate("/");
    },
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTimeout(() => {
      mutate({ emailOrUsername, password });
    }, 3000);
  }

  if (isError) return <Error>Error: {error.message}</Error>;

  return (
    <FormGroup title="Login to Circle" onSubmit={handleSubmit}>
      <Input
        type="text"
        id="emailOrUsername"
        value={emailOrUsername}
        onChange={(e) => setEmailOrUsername(e.target.value)}
      >
        Email/Username
      </Input>
      <Input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      >
        Password
      </Input>
      <p className="flex self-end text-white cursor-pointer">
        Forgot Password?
      </p>
      <Button disabled={isPending ? true : false}>Login</Button>
      <p className="text-white">
        Don't have an account yet?{" "}
        <Link to="/register" className="text-[#04A51E] font-bold">
          Create Account
        </Link>
      </p>
    </FormGroup>
  );
}
