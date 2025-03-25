import React, { JSX } from 'react';
import { Routes, Route, Navigate } from 'react-router';
import SingIn from '../pages/SingIn';
import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

import Profile from '../pages/Profile';
import Dashboard from '../pages/Dashboard';

const PrivateRoute = ({ element }: { element: JSX.Element }) => {
  const isAuthenticated = false;
  return isAuthenticated ? element : <Navigate to="/" />;
};

const RoutesProvider: React.FC = () => (
  <Routes>
    <Route path="/" element={<SingIn />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/reset-password" element={<ResetPassword />} />

    <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
    <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
  </Routes>
);

export default RoutesProvider;