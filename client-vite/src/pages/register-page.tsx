import { type FC } from "react";
import { Divider } from "@heroui/divider";
import { Link } from "@heroui/link";

import RegisterForm from "@/components/forms/register-form";
import Paths from "@/utils/paths";

const RegisterPage: FC = () => {
  return (
    <main className="flex items-center justify-center min-h-dvh">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small">
        <div className="flex flex-col gap-1">
          <h1 className="text-large font-medium">Sign Up</h1>
          <p className="text-small text-default-500 font-mono">
            to continue to Uno cards
          </p>
        </div>
        <RegisterForm />
        <div className="flex items-center gap-4 py-2">
          <Divider className="flex-1" />
          <p className="shrink-0 text-tiny text-default-500">OR</p>
          <Divider className="flex-1" />
        </div>
        <p className="text-center text-small">
          Need to create an account?&nbsp;
          <Link href={Paths.LOGIN} size="sm">
            Sign In
          </Link>
        </p>
      </div>
    </main>
  );
};

export default RegisterPage;
