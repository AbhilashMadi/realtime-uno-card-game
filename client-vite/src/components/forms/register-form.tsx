import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useState, type FC } from "react";
import { Form } from "@heroui/form";
import { Alert } from "@heroui/alert";

import { EyeIcon } from "@/components/icons";
import { useRegisterMutation } from "@/redux/services/auth-api";
import { RegisterSchema } from "@/types/auth-types";

const RegisterForm: FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [regsiter, { isError, error }] = useRegisterMutation();

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData) as RegisterSchema;

    await regsiter(data);
  };

  return (
    <Form
      className="flex flex-col gap-3"
      validationBehavior="native"
      onSubmit={handleSubmit}
    >
      <Input
        isRequired
        required
        label="Full Name"
        name="full_name"
        placeholder="Enter your Full Name"
        type="text"
        variant="bordered"
      />
      <Input
        isRequired
        label="Username"
        name="username"
        placeholder="Enter your username"
        type="text"
        variant="bordered"
      />
      <Input
        isRequired
        label="Email"
        name="email"
        placeholder="Enter your email"
        type="email"
        variant="bordered"
      />
      <Input
        isRequired
        autoComplete="password"
        endContent={
          <button type="button" onClick={toggleVisibility}>
            <EyeIcon open={isVisible} />
          </button>
        }
        label="Password"
        name="password"
        placeholder="Enter your password"
        type={isVisible ? "text" : "password"}
        variant="bordered"
      />
      <Input
        isRequired
        autoComplete="confirm_password"
        endContent={
          <button type="button" onClick={toggleConfirmVisibility}>
            <EyeIcon open={isConfirmVisible} />
          </button>
        }
        label="Confirm Password"
        name="confirm_password"
        placeholder="Confirm your password"
        type={isConfirmVisible ? "text" : "password"}
        variant="bordered"
      />
      {isError && (
        <Alert
          color="danger"
          //@ts-ignore
          description={error?.data.error.message}
          title={""}
        />
      )}
      <Button className="w-full" color="primary" type="submit">
        Sign Up
      </Button>
    </Form>
  );
};

export default RegisterForm;
