import React from 'react';
import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navigation from 'components/Navigation/Navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchCurrentUser } from 'redux/operations/operations';
import PrivateRoute from 'components/PrivateRoute';
import PublicRoute from 'components/PublicRoute';
import { getIsFetchingCurrent } from 'redux/store';
// const Navigation = lazy(() => import('../Navigation/Navigation'));
const Register = lazy(() => import('../Auth/Register'));
const Login = lazy(() => import('../Auth/Login'));
const Contacts = lazy(() => import('../Contacts/Contacts'));
export const App = () => {
  const dispatch = useDispatch();
  const isFetchingCurrentUser = useSelector(getIsFetchingCurrent);
  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    !isFetchingCurrentUser && (
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route
            index
            element={
              <PublicRoute restricted redirectTo="/contacts">
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute restricted>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute restricted redirectTo="/contacts">
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/contacts"
            element={
              <PrivateRoute>
                <Contacts />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    )
  );
};
