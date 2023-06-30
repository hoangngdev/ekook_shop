import React, { useState } from 'react';
import LoginPage from './pages/login/login';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const Layout = () => {
  return (
    <>
      Main page
    </>
  )
}

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <div>404 Not found</div>,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}
