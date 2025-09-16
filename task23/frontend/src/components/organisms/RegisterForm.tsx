import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { usersKeys, registerUser } from "../../queries/users";
import { Input, Button, Error } from "../atoms";
import { FormGroup } from "../molecules";

export function RegisterForm() {
  const navigate = useNavigate();
  const [full_name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: usersKeys.all,
    mutationFn: registerUser,
    onSuccess: () => {
      navigate("/login");
    },
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTimeout(() => {
      mutate({ full_name, email, password });
    }, 3000);
  }

  if (isError) return <Error>Error: {error.message}</Error>;

  return (
    <FormGroup title="Create account Circle" onSubmit={handleSubmit}>
      <Input
        type="text"
        id="fullName"
        value={full_name}
        onChange={(e) => setFullName(e.target.value)}
      >
        Full Name
      </Input>
      <Input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      >
        Email
      </Input>
      <Input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      >
        Password
      </Input>
      <Button disabled={isPending ? true : false}>Create</Button>
      <p className="text-white">
        Already have account?{" "}
        <Link to="/login" className="text-[#04A51E] font-bold">
          Login
        </Link>
      </p>
    </FormGroup>
  );
}
