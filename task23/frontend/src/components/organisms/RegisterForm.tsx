// RegisterForm.jsx
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { usersKeys, registerUser } from "../../queries/users";
import { Input, Button, Alert } from "../atoms";
import { FormGroup } from "../molecules";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { isAxiosError } from "axios";

// Definisikan skema validasi menggunakan Zod
const registerSchema = z.object({
  full_name: z
    .string()
    .min(3, { message: "Full name must be at least 3 characters" })
    .max(50, { message: "Full name must be at most 50 characters" })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Full name can only contain letters and spaces",
    }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    // Sangat penting untuk memberikan nilai default
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: usersKeys.all,
    mutationFn: registerUser,
    onSuccess: () => {
      navigate("/login");
    },
  });

  // onSubmit sekarang menerima data yang telah divalidasi dari React Hook Form
  function onSubmit(data: RegisterFormData) {
    mutate(data); // Kirim data yang divalidasi
  }

  return (
    <FormGroup title="Create account Circle" onSubmit={handleSubmit(onSubmit)}>
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
        <p style={{ color: "red" }}>{errors.full_name.message}</p>
      )}
      <Input type="email" id="email" {...register("email")}>
        Email
      </Input>
      {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
      <Input type="password" id="password" {...register("password")}>
        Password
      </Input>
      {errors.password && (
        <p style={{ color: "red" }}>{errors.password.message}</p>
      )}
      <Button disabled={isPending}>Create</Button>
      <p className="text-white">
        Already have account?{" "}
        <Link to="/login" className="text-[#04A51E] font-bold">
          Login
        </Link>
      </p>
    </FormGroup>
  );
}
