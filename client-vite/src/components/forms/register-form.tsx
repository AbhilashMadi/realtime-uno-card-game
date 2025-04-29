import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useState, type FC } from "react";
import { Form } from "@heroui/form";

import { EyeIcon } from "@/components/icons";

const RegisterForm: FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

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
        endContent={
          <button type="button" onClick={toggleConfirmVisibility}>
            <EyeIcon open={isConfirmVisible} />
          </button>
        }
        label="Confirm Password"
        name="confirmPassword"
        placeholder="Confirm your password"
        type={isConfirmVisible ? "text" : "password"}
        variant="bordered"
      />
      <Button className="w-full" color="primary" type="submit">
        Sign Up
      </Button>
    </Form>
  );
};

export default RegisterForm;
