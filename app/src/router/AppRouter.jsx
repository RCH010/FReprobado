import React, { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { Box } from '@chakra-ui/layout';

import { RequireAuth } from './RequireAuth';
import { Login } from '../views/auth/Login';
import { SingUp } from '../views/auth/SingUp';
import { Dashboard } from '../views/Dashboard/Dashboard';
import { Loading } from '../views/auth/Loading';
import { NotFound } from '../views/NotFound';
import { DashboardProvider } from '../providers/DashboardProvider';

import useAuth from '../hooks/useAuth';
import routesPaths from './routes';

export const AppRouter = () => {
  const { authContext } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoading, isLoggedIn } = authContext;

  useEffect(() => {
    if (isLoggedIn && location.pathname.split('/')[1] !== 'auth') {
      navigate(`${routesPaths.AUTHBASE}${routesPaths.DASHBOARD}`);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn])


  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      flexDirection={'column'}
      minH={'100vh'}
    >
      <Box
        display={'flex'}
        width={'100%'}
        height={'100vh'}
        flexDirection={'column'}
        alignItems={'center'}
      >
        <Routes>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              { !isLoggedIn ? (
                <>
                  <Route path={routesPaths.LOGIN} element={<Login />} />
                  <Route path={routesPaths.SIGNUP} element={<SingUp />} />
                  <Route path="*" element={<NotFound />} />
                </>
              ) : (
                <>
                  <Route
                    path={`${routesPaths.AUTHBASE}/*`}
                    element={
                      <RequireAuth>
                        <DashboardProvider>
                          <Routes>
                            <Route
                              path={routesPaths.DASHBOARD}
                              element={<Dashboard />}
                            />
                          </Routes>
                        </DashboardProvider>
                      </RequireAuth>
                    }
                  />
                </>
              )}
              <Route path="*" element={<NotFound />} />
            </>
          )}
        </Routes>
      </Box>
    </Box>
  );
};
