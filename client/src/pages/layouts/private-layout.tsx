import { type FC } from 'react';
import { Navigate, Outlet } from "react-router-dom";

import useAuth from "@/hooks/use-auth";
import Paths from "@/utils/paths";

const PrivateLayout: FC = () => {
  const { autenticated } = useAuth();

  return (autenticated
    ? <Outlet />
    : <Navigate to={Paths.LOGIN} replace />)
}

export default PrivateLayout;