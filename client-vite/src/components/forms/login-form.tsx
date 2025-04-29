import { Alert } from "@heroui/alert";
import { Button } from "@heroui/button";
import { Checkbox } from "@heroui/checkbox";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Link } from "@heroui/link";
import { useState, type FC } from "react";

import { EyeIcon } from "@/components/icons";
import { useLoginMutation } from "@/redux/services/auth-api";
import { LoginSchema } from "@/types/auth-types";

const LoginForm: FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [login, { isLoading, isError, data, error }] = useLoginMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const remember = "remember" in data;

    await login({ ...data, remember } as LoginSchema);
  };

  return (
    <Form
      className="flex flex-col gap-3"
      validationBehavior="native"
      onSubmit={handleSubmit}
    >
      <Input
        isRequired
        autoComplete="username"
        label="Username"
        name="username"
        placeholder="Enter your username"
        variant="bordered"
      />
      <Input
        isRequired
        autoComplete="current-password"
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
      <div className="flex w-full items-center justify-between px-1 py-2">
        <Checkbox name="remember" size="sm">
          Remember me
        </Checkbox>
        <Link className="text-default-500" href="#" size="sm">
          Forgot password?
        </Link>
      </div>
      {isError && (
        <Alert
          color="danger"
          //@ts-ignore
          description={error?.data?.error?.message || "Something went wrong"}
          title=""
        />
      )}
      <Button
        className="w-full"
        color="primary"
        isLoading={isLoading}
        type="submit"
      >
        Sign In
      </Button>
    </Form>
  );
};

export default LoginForm;
