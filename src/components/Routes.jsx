import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthorization } from '../hooks';

export const PrivateRoute = ({ component: Component, redirectTo = '/' }) => {
  const { isLoggedIn, isRefreshing } = useAuthorization();
  const shouldRedirect = !isLoggedIn && !isRefreshing;

  return shouldRedirect ? <Navigate to={redirectTo} /> : Component;
};

export const RestrictedRoute = ({ component: Component, redirectTo = '/' }) => {
  const { isLoggedIn } = useAuthorization();

  return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
};
