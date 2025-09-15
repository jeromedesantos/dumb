import { Link, useNavigate } from "react-router-dom";
import { useState, type FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { usersKeys, loginUser } from "../../queries/users";
import { Input, Button, Alert } from "../atoms";
import { FormGroup } from "../molecules";
import { isAxiosError } from "axios";

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
    mutate({ emailOrUsername, password });
  }

  return (
    <FormGroup title="Login to Circle" onSubmit={handleSubmit}>
      {isError && (
        <Alert variant="danger">
          {isAxiosError(error) && error.response
            ? error.response.data.message
            : error.message}
        </Alert>
      )}
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
      <Button disabled={isPending}>Login</Button>
      <p className="text-white">
        Don't have an account yet?{" "}
        <Link to="/register" className="text-[#04A51E] font-bold">
          Create Account
        </Link>
      </p>
    </FormGroup>
  );
}
