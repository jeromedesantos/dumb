import { useState, type FormEvent } from "react";
import { Input, Button } from "../atoms";
import { FormGroup } from "../molecules";

export function ResetForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <FormGroup title="Reset password" onSubmit={handleSubmit}>
      <Input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      >
        Password
      </Input>
      <Input
        type="password"
        id="confirmPassword"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      >
        Confirm New Password
      </Input>
      <Button>Create New Password</Button>
    </FormGroup>
  );
}
