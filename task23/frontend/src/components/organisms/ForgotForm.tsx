import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Input, Button } from "../atoms";
import { FormGroup } from "../molecules";

export function ForgotForm() {
  const [email, setEmail] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <FormGroup title="Forgot password" onSubmit={handleSubmit}>
      <Input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      >
        Full Name
      </Input>
      <Button>Send Instruction</Button>
      <p className="text-white">
        Already have account?{" "}
        <Link to="/login" className="text-[#04A51E] font-bold">
          Login
        </Link>
      </p>
    </FormGroup>
  );
}
