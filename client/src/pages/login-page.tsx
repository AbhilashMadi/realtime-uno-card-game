import { type FC } from 'react'
import LoginForm from "@/components/forms/login-form";

const LoginPage: FC = () => {
  return (<main className="flex items-center justify-center min-h-dvh">
    <LoginForm />
  </main>)
}

export default LoginPage;