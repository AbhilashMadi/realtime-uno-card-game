import { type FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

import Paths from "@/utils/paths";
import useAuth from "@/hooks/use-auth";
import { Provider } from "@/context/provider";

const PublicLayout: FC = () => {
  const { autenticated } = useAuth();

  return autenticated ? (
    <Provider>
      <Navigate replace to={Paths.LANDING} />
    </Provider>
  ) : (
    <Outlet />
  );
};

export default PublicLayout;
