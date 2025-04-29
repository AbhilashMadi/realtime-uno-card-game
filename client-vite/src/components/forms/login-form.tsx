import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { Checkbox } from "@heroui/checkbox";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { useState, type FC } from "react";

import { EyeIcon } from "@/components/icons";

const LoginForm: FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <Form
      className="flex flex-col gap-3"
      validationBehavior="native"
      onSubmit={handleSubmit}
    >
      <Input
        isRequired
        label="Email Address"
        name="email"
        placeholder="Enter your email"
        type="email"
        variant="bordered"
      />
      <Input
        isRequired
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
      <Button className="w-full" color="primary" type="submit">
        Sign In
      </Button>
    </Form>
  );
};

export default LoginForm;
