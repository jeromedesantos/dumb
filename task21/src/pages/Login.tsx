import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      login("token_jeremy");
      navigate("/product");
    } else {
      setErrorMsg("Invalid username or password");
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center mt-10">
      <Card className="md:w-100 bg-white dark:bg-zinc-900 flex flex-col gap-5">
        <CardHeader className="flex flex-col gap-2 mb-5 items-center">
          <CardTitle className="text-cyan-700 font-black text-2xl dark:text-zinc-300">
            Login
          </CardTitle>
          <CardDescription>Hei, good to see you again!</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <form
            action="submit"
            className="flex flex-col gap-5"
            onSubmit={handleLogin}
          >
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="username"
                className="text-cyan-700 dark:text-zinc-300"
              >
                Username
              </Label>
              <Input
                className="rounded-full"
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="password"
                className="text-cyan-700 dark:text-zinc-300"
              >
                Password
              </Label>
              <Input
                className="rounded-full"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {errorMsg && <p className="text-destructive w-full">{errorMsg}</p>}
            <CardAction className="w-full flex flex-col gap-2 mt-5">
              <Button
                type="submit"
                variant="default"
                className="w-full rounded-full bg-cyan-500 hover:bg-cyan-700 font-bold cursor-pointer dark:bg-cyan-700 dark:hover:bg-cyan-500 dark:text-zinc-300"
              >
                Login
              </Button>
            </CardAction>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
