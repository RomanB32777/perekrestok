import { useRoutes, RouteObject } from "react-router";
import AdminContainer from "./containers/AdminContainer";
import LandingContainer from "./containers/LandingContainer";
import MainContainer from "./containers/MainContainer";
import CitiesPage from "./pages/CitiesPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import TermsPage from "./pages/TermsPage";
import VacanciesPage from "./pages/VacanciesPage";

export const routers: RouteObject[] = [
  {
    path: "/",
    element: <MainContainer />,
    children: [
      {
        index: true,
        element: <LandingContainer />,
      },
      {
        path: "terms",
        element: <TermsPage />,
      },
    ],
  },
  {
    path: "admin",
    element: <AdminContainer />,
    children: [
      {
        path: "cities",
        element: <CitiesPage />,
        id: "Города"
      },
      {
        path: "vacancies",
        element: <VacanciesPage />,
        id: "Вакансии"
      },
    ],
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "*",
    element: <LandingPage />,
  },
];

export const Pages = () => {
  const pages = useRoutes(routers);
  return pages;
};
