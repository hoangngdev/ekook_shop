import React, { useEffect, useState } from 'react';
import LoginPage from './pages/login/login';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Outlet } from "react-router-dom";
import ContactPage from './pages/contact';
import BookPage from './pages/book';
import Header from './components/Header';
import Footer from './components/footer';
import Home from './components/Home';
import RegisterPage from './pages/register/register';
import { callFetchAccount } from './services/api';
import { useDispatch, useSelector } from 'react-redux';
import { doGetAccountAction } from './redux/account/accountSlice';
import ProtectedRoute from './components/ProtectedRoute';
import AdminPage from './pages/admin';
import Loading from './components/Loading';

const Layout = () => {
  return (
    <div className='layout-app'>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default function App() {

  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.account.isAuthenticated)

  const getAccount = async () => {
    if (window.location.pathname === 'login' || window.location.pathname === 'register') {
      return;
    }
    const res = await callFetchAccount();
    if (res && res.data) {
      dispatch(doGetAccountAction(res.data))
    }
  }

  useEffect(() => {
    getAccount();
  }, [])

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <NotFound />,

      children: [
        { index: true, element: <Home /> },
        {
          path: "contact",
          element: <ContactPage />,
        },
        {
          path: "book",
          element: <BookPage />,
        }
      ],

    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/admin",
      element: <Layout />,
      errorElement: <NotFound />,

      children: [
        {
          index: true, element:
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
        },
        {
          path: "contact",
          element: <ContactPage />,
        },
        {
          path: "book",
          element: <BookPage />,
        }
      ],

    },
  ]);

  return (
    <>{isAuthenticated === true
      || window.location.pathname === '/login' ?
      <RouterProvider router={router} />
      :
      <Loading />
    }
    </>
  )
}
