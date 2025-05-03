import { type FC } from "react";
import { Route, Routes } from "react-router-dom";

import RoomPage from "./pages/room-page";

import Loader from "@/components/common/loader";
import LandingPage from "@/pages/landing-page";
import PrivateLayout from "@/pages/layouts/private-layout";
import PublicLayout from "@/pages/layouts/public-layout";
import LoginPage from "@/pages/login-page";
import NotFoundPage from "@/pages/not-found-page";
import RegisterPage from "@/pages/register-page";
import { useGetMeQuery } from "@/redux/services/auth-api";
import Paths from "@/utils/paths";

const App: FC = () => {
  const { isFetching } = useGetMeQuery();

  if (isFetching) {
    return (
      <main className="h-dvh w-full flex-center">
        <Loader />
      </main>
    );
  }

  return (
    <Routes>
      <Route element={<PublicLayout />} path={Paths.LANDING}>
        <Route element={<LoginPage />} path={Paths.LOGIN} />
        <Route element={<RegisterPage />} path={Paths.REGISTER} />
      </Route>
      <Route element={<PrivateLayout />} path={Paths.LANDING}>
        <Route index element={<LandingPage />} />
        <Route element={<RoomPage />} path={Paths.ROOM} />
      </Route>
      <Route element={<NotFoundPage />} path="*" />
    </Routes>
  );
};

export default App;
