import React from 'react';
import { Route, Navigate } from 'react-router';

import { useAuth } from '../hooks/auth';

interface CustomRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
  path: string
}

const CustomRoute: React.FC<CustomRouteProps> = ({
  isPrivate = false,
  component: Component,
  path
}) => {
  const { user } = useAuth();

  if(isPrivate && !user)
    return <Navigate to="/" replace />;

  if(!isPrivate && user)
    return <Navigate to="/dashboard" replace />;

  return <Route path={path} element={<Component />} />;
};

export default CustomRoute;
