import Paths from "@/utils/paths";
import { type FC } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import PrivateLayout from "@/pages/layouts/private-layout";
import PublicLayout from "@/pages/layouts/public-layout";

import LandingPage from "@/pages/landing-page";
import LoginPage from "@/pages/login-page";
import NotFoundPage from "@/pages/not-found-page";
import RegisterPage from "@/pages/register-page";
import { ThemeProvider } from "./context/theme-provider";

const routes = createBrowserRouter([
	{
		path: Paths.LANDING,
		element: <PrivateLayout />,
		children: [
			{ index: true, element: <LandingPage /> },
		],
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
	return (<ThemeProvider>
		<RouterProvider router={routes} />
	</ThemeProvider>)
};

export default App;
