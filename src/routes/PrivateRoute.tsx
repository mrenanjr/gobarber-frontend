import React, { FC } from 'react';
import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../hooks/auth';

interface PrivateRouteProps {
  redirectPath?: string;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ redirectPath = '/' }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to={redirectPath} replace />;

  return <Outlet />;
};

export default PrivateRoute;
