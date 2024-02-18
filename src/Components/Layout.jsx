import React from 'react';
import DefaultLayout from './DefaultLayout';
import AdminLayout from '../Admin/AdminLayout';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../Components/useAuth';

const Layout = ({ children }) => {
  const location = useLocation();
  const { user } = useAuth();

  // Check if the path includes "admin/" and the user is logged in as an admin
  const isAdminRoute = location.pathname.includes('/admin') && user && user.role === 'admin';

  return isAdminRoute ? <AdminLayout>{children}</AdminLayout> : <DefaultLayout>{children}</DefaultLayout>;
};

export default Layout;
