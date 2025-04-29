import { type FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

import useAuth from "@/hooks/use-auth";
import Paths from "@/utils/paths";
import { Provider } from "@/context/provider";

const PrivateLayout: FC = () => {
  const { autenticated } = useAuth();

  return autenticated ? (
    <Provider>
      <Outlet />
    </Provider>
  ) : (
    <Navigate replace to={Paths.LOGIN} />
  );
};

export default PrivateLayout;
