import React from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "./pages/Home/Home";
import Categories from "./pages/Categories/Categories";
import Category from "./pages/Category/Category";
import Hospitals from "./pages/Hospitals/Hospitals";
import Hospital from "./pages/Hospital/Hospital";
import Services from "./pages/Services/Services";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";
import HospitalByCategory from "./pages/HospitalByCategory/HospitalByCategory";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "categories",
          element: <Categories />,
        },
        {
          path: "categories/:id",
          element: <Category />,
        },
        {
          path: "hospitals",
          element: <Hospitals />,
        },
        {
          path: "hospitals/:id",
          element: <Hospital />,
        },
        {
          path: "categories/:id/hospitals/:id",
          element: <HospitalByCategory />,
        },
        {
          path: "services",
          element: <Services />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "login",
          element: <Login />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
