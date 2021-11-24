import React, { useContext, useState } from 'react';
import {
  Flex,
  Text,
  Button,
  useToast,
} from '@chakra-ui/react';
import { AuthContext } from '../providers/AuthProvider';
import { useNavigate } from 'react-router';
import routesPaths from '../router/routes';
import { errorMessages } from '../utils/utils';

export const Banner = () => {
  const { logout } = useContext(AuthContext);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const onSuccess = () => {
    navigate(routesPaths.LOGIN);
  };

  const onError = (message) => {
    toast({
      title: 'Ups!',
      description: message,
      status: 'error',
      duration: 5000,
      isClosable: true,
      position: 'bottom',
    });
  };

  const onLogOutClick = () => {
    setIsLoggingOut(true);
    logout()
    .then(() => {
      setIsLoggingOut(false);
      onSuccess();
    })
    .catch(err => {
      const errorCode = err.code;
      let errorMessage = errorMessages[errorCode];
      if (!errorMessage) {
        errorMessage = 'Oh no, hubo un problema, por favor intentalo más tarde'
      }
      onError(errorMessage)
    })
  };

  return (
    <>
      <Flex
        flexDirection="row"
        width="100%"
        justifyContent="space-between"
        alignItems="center"
        padding=".8em"
      >
        <Flex alignItems="center" flexDir="row" h="100%">
          <Text fontSize="3xl" fontWeight="bold">
            DMA
          </Text>
        </Flex>
        <Button
          onClick={onLogOutClick}
          isLoading={isLoggingOut}
          loadingText="Cerrando Sesión"
          variant="outline"
        >
          Cerrar Sesión
        </Button>
      </Flex>
    </>
  );
};
