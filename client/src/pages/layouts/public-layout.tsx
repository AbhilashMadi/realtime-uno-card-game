import { type FC } from 'react';
import { Navigate, Outlet } from "react-router-dom";

import Paths from "@/utils/paths";
import useAuth from "@/hooks/use-auth";

const PublicLayout: FC = () => {
  const { autenticated } = useAuth();

  return (autenticated
    ? <Navigate to={Paths.LANDING} replace />
    : <Outlet />)
}

export default PublicLayout;