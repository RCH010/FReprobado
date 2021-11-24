import React, { useContext, useEffect } from 'react';
import { Flex, Box } from '@chakra-ui/react';
import { Banner } from '../../components/Banner';
import { Outlet } from 'react-router';
import { DashboardContext } from '../../providers/DashboardProvider';
import { AuthContext } from '../../providers/AuthProvider';
import { collection, doc, onSnapshot, query, where } from '@firebase/firestore';
import { APIService } from '../../firebase/firebase';

export const Dashboard = () => {
  const {
    setCurrentUser,
    setIsLoadingCurrentUsers,
    setEvaluations,
    setIsLoadingEvaluations,
  } = useContext(DashboardContext);
  const { authContext } = useContext(AuthContext);

  useEffect(() => {
    if (authContext.user?.userId) {
      return onSnapshot(
        doc(APIService.app().firestore(), 'users', authContext.user.userId),
        (snapshot) => {
          const data = { ...snapshot.data(), id: authContext.user.userId };
          setCurrentUser(data);
          setIsLoadingCurrentUsers(false);
          return data;
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authContext.user]);

  useEffect(() => {
    if (authContext.user?.userId) {
      const q = query(
        collection(APIService.app().firestore(), 'evaluations'),
        where('userId', '==', authContext.user?.userId)
      );

      return onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map((doc) => {
          return { ...doc.data(), ...{ id: doc.id } };
        });
        console.log('eval', data);
        setEvaluations(data);
        setIsLoadingEvaluations(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authContext.user]);

  return (
    <Flex flexGrow={1} flexDir="column" height="100%" width="100%">
      <Banner />
      <Flex flexDir="row" height="100%" width="100%">
        <Box height="100%" width="100%" padding="1em">
          <Outlet />
        </Box>
      </Flex>
    </Flex>
  );
};
