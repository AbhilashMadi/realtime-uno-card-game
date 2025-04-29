import { type FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

import Paths from "@/utils/paths";
import useAuth from "@/hooks/use-auth";

const PublicLayout: FC = () => {
  const { autenticated } = useAuth();

  return autenticated ? <Navigate replace to={Paths.LANDING} /> : <Outlet />;
};

export default PublicLayout;
