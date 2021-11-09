import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Box } from '@chakra-ui/layout';

import useAuth from '../hooks/useAuth';

import { RequireAuth } from './RequireAuth';
import { Login } from '../views/auth/Login';
import { SingUp } from '../views/auth/SingUp';
import { Dashboard } from '../views/Dashboard';
import { Loading } from '../views/auth/Loading';
import { NotFound } from '../views/NotFound';
import routesPaths from './routes';


export const AppRouter = () => {
  const { authContext } = useAuth();
  const { isLoading } = authContext;
  return (
    <Box display={'flex'} alignItems={'center'} flexDirection={'column'} minH={'100vh'}>
      <Box display={'flex'} width={'100%'} height={'100vh'} flexDirection={'column'} alignItems={'center'}>
        <Routes>
            {
              isLoading ? (
                <Loading />
              ) : (
                <>
                  <Route path={routesPaths.LOGIN} element={<Login />} />
                  <Route path={routesPaths.SIGNUP} element={<SingUp />} />  
                  <Route 
                    path={routesPaths.AUTHBASE}
                    element={
                      <RequireAuth>
                        <Route path={routesPaths.DASHBOARD} element={<Dashboard />} />
                      </RequireAuth>
                    }
                  />
                  <Route path='*' element={<NotFound />} />
                </>
              )
            }
        </Routes>
      </Box>
    </Box>
  )
}
