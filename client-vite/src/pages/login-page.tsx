import { type FC } from "react";
import { Link } from "@heroui/link";
import { Divider } from "@heroui/divider";

import LoginForm from "@/components/forms/login-form";
import Paths from "@/utils/paths";

const LoginPage: FC = () => {
  return (
    <main className="h-dvh w-full flex-center">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small">
        <div className="flex flex-col gap-1">
          <h1 className="text-large font-medium">Sign in to your account</h1>
          <p className="text-small text-default-500 font-mono">
            to continue to Uno cards
          </p>
        </div>
        <LoginForm />
        <div className="flex items-center gap-4 py-2">
          <Divider className="flex-1" />
          <p className="shrink-0 text-tiny text-default-500">OR</p>
          <Divider className="flex-1" />
        </div>
        <p className="text-center text-small">
          Need to create an account?&nbsp;
          <Link href={Paths.REGISTER} size="sm">
            Sign Up
          </Link>
        </p>
      </div>
    </main>
  );
};

export default LoginPage;
