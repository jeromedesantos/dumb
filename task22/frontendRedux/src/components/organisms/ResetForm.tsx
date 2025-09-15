import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { isAxiosError } from "axios";
import { usersKeys, resetUser } from "../../queries/users";
import { Input, Button, Alert } from "../atoms";
import { FormGroup } from "../molecules";
import { resetSchema, type ResetFormData } from "../../schema/reset";

export function ResetForm({ id }: { id: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetFormData>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      password: "",
      newPassword: "",
    },
  });

  const navigate = useNavigate();
  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: usersKeys.all,
    mutationFn: (data: ResetFormData) => resetUser(id, data),
    onSuccess: () => {
      navigate("/login");
    },
  });

  function onSubmit(data: ResetFormData) {
    mutate(data);
  }
  return (
    <FormGroup title="Reset password" onSubmit={handleSubmit(onSubmit)}>
      {isError && (
        <Alert variant="danger">
          {isAxiosError(error) && error.response
            ? error.response.data.message
            : error.message}
        </Alert>
      )}
      <Input type="password" id="password" {...register("password")}>
        Password
      </Input>
      {errors.password && (
        <p className="text-red-500">{errors.password.message}</p>
      )}
      <Input type="password" id="confirmPassword" {...register("newPassword")}>
        Confirm New Password
      </Input>
      {errors.newPassword && (
        <p className="text-red-500">{errors.newPassword.message}</p>
      )}
      <Button disabled={isPending}>Create New Password</Button>
    </FormGroup>
  );
}
