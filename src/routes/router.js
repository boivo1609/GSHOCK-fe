// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import MinimalLayout from 'layout/MinimalLayout';
import BannerList from 'pages/Admin/Banner/List';
import DanhMucList from 'pages/Admin/Danhmuc/List';
import ColorList from 'pages/Admin/Mausac/List';

import ProductList from 'pages/Admin/SanPham/List';
import HomePage from 'pages/Customer/HomePage/HomePage';
import ProductDetailPage from 'pages/Customer/ProductPage/ProductDetailPage';
import ProductPage from 'pages/Customer/ProductPage/ProductPage';
import CartListPage from 'pages/Customer/Cart/CartListPage';
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import PaymentPage from 'pages/Customer/Payment/PaymentPage';
import OrderSuccessPage from 'pages/Customer/Payment/OrderSuccessPage';
import OrderList from 'pages/Admin/Order/List';
import UserList from 'pages/Admin/User/List';
import OrderHistory from 'pages/Customer/OrderHistory/OrderHistory';
import UpdateUser from 'pages/Customer/UpdateUser/UpdateUser';
const AuthLogin = Loadable(lazy(() => import('pages/authentication/Login')));
const AuthRegister = Loadable(lazy(() => import('pages/authentication/Register')));
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

const router = (isLoggedIn) => [
  {
    path: '/admin',
    element: isLoggedIn ? <MainLayout /> : <Navigate to="/" />,
    children: [
      {
        path: '/admin',
        element: <DashboardDefault />
      },
      {
        path: 'danhmuc',
        element: <DanhMucList />
      },
      {
        path: 'products-manager',
        element: <ProductList />
      },
      {
        path: 'color',
        element: <ColorList />
      },
      {
        path: 'banner',
        element: <BannerList />
      },
      {
        path: 'order',
        element: <OrderList />
      },
      {
        path: 'user',
        element: <UserList />
      }
    ]
  },
  {
    path: '/',
    element: isLoggedIn ? <Navigate to="/admin" /> : <MinimalLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/products',
        element: <ProductPage />
      },
      {
        path: '/cart',
        element: <CartListPage />
      },
      {
        path: '/products/:id',
        element: <ProductDetailPage />
      },
      {
        path: '/payment',
        element: <PaymentPage></PaymentPage>
      },
      {
        path: 'login',
        element: <AuthLogin />
      },
      {
        path: '/order-success',
        element: <OrderSuccessPage></OrderSuccessPage>
      },
      {
        path: 'orderhistory',
        element: <OrderHistory></OrderHistory>
      },
      {
        path: 'update-user',
        element: <UpdateUser></UpdateUser>
      },
      {
        path: 'register',
        element: <AuthRegister />
      },
      {
        path: '/logout',
        element: <Navigate to="/" />
      }
    ]
  }
];

export default router;
