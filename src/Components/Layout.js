import React from 'react';
import DefaultLayout from './DefaultLayout'; 
import AdminLayout from '../Admin/AdminLayout'; 
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();

  // Check if the path includes "admin/"
  const isAdminRoute = location.pathname.includes('/admin');

  return isAdminRoute ? <AdminLayout>{children}</AdminLayout> : <DefaultLayout>{children}</DefaultLayout>;
};

export default Layout;