// RegisterForm.jsx
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { isAxiosError } from "axios";
import { usersKeys, registerUser } from "../../queries/users";
import { Input, Button, Alert } from "../atoms";
import { Form } from "../molecules";
import { registerSchema, type RegisterFormData } from "../../schema/register";

export function FormRegister() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
    },
  });
  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: usersKeys.all,
    mutationFn: registerUser,
    onSuccess: () => {
      navigate("/login");
    },
  });

  function onSubmit(data: RegisterFormData) {
    mutate(data);
  }

  return (
    <Form title="Create account Circle" onSubmit={handleSubmit(onSubmit)}>
      {isError && (
        <Alert variant="danger">
          {isAxiosError(error) && error.response
            ? error.response.data.message
            : error.message}
        </Alert>
      )}
      <Input
        type="text"
        id="full_name" // Pastikan id sesuai dengan key di skema Zod
        {...register("full_name")}
      >
        Full Name
      </Input>
      {errors.full_name && (
        <p className="text-red-500">{errors.full_name.message}</p>
      )}
      <Input type="email" id="email" {...register("email")}>
        Email
      </Input>
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      <Input type="password" id="password" {...register("password")}>
        Password
      </Input>
      {errors.password && (
        <p className="text-red-500">{errors.password.message}</p>
      )}
      <Button disabled={isPending}>Create</Button>
      <p className="text-zinc-300">
        Already have account?{" "}
        <Link to="/login" className="text-[#04A51E] font-bold">
          Login
        </Link>
      </p>
    </Form>
  );
}
