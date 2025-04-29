import { type FC } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LandingPage from "@/pages/landing-page";
import PrivateLayout from "@/pages/layouts/private-layout";
import PublicLayout from "@/pages/layouts/public-layout";
import LoginPage from "@/pages/login-page";
import NotFoundPage from "@/pages/not-found-page";
import RegisterPage from "@/pages/register-page";
import Paths from "@/utils/paths";

const routes = createBrowserRouter([
  {
    path: Paths.LANDING,
    element: <PrivateLayout />,
    children: [{ index: true, element: <LandingPage /> }],
  },
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { path: Paths.LOGIN, element: <LoginPage /> },
      { path: Paths.REGISTER, element: <RegisterPage /> },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);

const App: FC = () => {
  return <RouterProvider router={routes} />;
};

export default App;
