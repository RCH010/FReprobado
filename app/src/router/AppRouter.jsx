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
                  <Route path='/' element={<Login />} />
                  <Route path='/sing-up' element={<SingUp />} />  
                  <Route 
                    path='/auth'
                    element={
                      <RequireAuth>
                        <Route path='/' element={<Dashboard />} />
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
