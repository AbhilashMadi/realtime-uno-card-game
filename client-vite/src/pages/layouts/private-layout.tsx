import { type FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

import useAuth from "@/hooks/use-auth";
import Paths from "@/utils/paths";

const PrivateLayout: FC = () => {
  const { autenticated } = useAuth();

  return autenticated ? (
    <main className="p-4 min-h-dvh w-full">
      <div className="min-h-[calc(100dvh-2rem)] w-full rounded-3xl p-4 flex gap-4 border border-zinc-400 shadow">
        <Outlet />
      </div>
    </main>
  ) : (
    <Navigate replace to={Paths.LOGIN} />
  );
};

export default PrivateLayout;
