import { useAppSelector } from "./redux-hooks";

export default function useAuth() {
  const { user } = useAppSelector((s) => s.auth_slice);

  return {
    autenticated: user !== null,
    user: user,
  };
}
