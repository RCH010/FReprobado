import React, { 
  // useContext 
} from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Stack,
  Link as ChakraLink,
  Button,
  Heading,
  // useToast,
  Divider,
  Text,
} from '@chakra-ui/react';

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { Link } from "react-router-dom";
import { BaseContainer } from '../../components/BaseContainer';
import routesPaths from '../../router/routes';
// import { AuthContext } from '../../providers/AuthProvider';


export const Login = () => {
  // const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const { register, formState: { errors }, handleSubmit } = useForm();
  // const toast = useToast();
  
  // const onSuccess = () => {
  //   navigate(`${routesPaths.AUTHBASE + routesPaths.DASHBOARD}`)
  // }
  
  // const onError = (data) => {
  //   toast({
  //     title: 'Ups!',
  //     description: data.message,
  //     status: 'error',
  //     duration: 5000,
  //     isClosable: true,
  //     position: 'bottom',
  //   });
  // }

  const onSubmit = (values) => {
    console.log(values);
    navigate(`${routesPaths.AUTHBASE + routesPaths.DASHBOARD}`)
    // TODO login request (onSuccess and onError)
  }

  return (
    <BaseContainer>
      <Stack align={'center'} spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Heading fontSize={'4xl'}>Iniciar sesión</Heading>
        <Box
          p={8}
          minW='sm  '
          rounded={'lg'}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl
              mb='4'
              isInvalid={Boolean(errors.email)}>
              <FormLabel htmlFor="email">Correo</FormLabel>
              <Input
                name="email"
                type="email"
                autoComplete='on'
                placeholder='ejemplo@gmail.com'
                {...register('email', {
                  required: 'El correo electrónico es obligatorio',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: 'Ingresa un correo electrónico válido',
                  },
                })}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              mb='4'
              
              isInvalid={Boolean(errors.password)}>
              <FormLabel htmlFor='password'>Contraseña</FormLabel>
              <Input
                name='password'
                type="password"
                autoComplete='on'
                {...register('password', {
                  required: 'Por favor ingresa tu contraseña',
                  minLength: {
                    value: 8,
                    message: 'Debe ser mayor a 8 caracteres'
                  }  
                })}
              />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
            <Stack spacing={8}>
              <Button type="submit">Entrar</Button>
            </Stack>
          </form>
          <Divider my={4}/>
          <Box textAlign={'center'} >
            <ChakraLink 
              as={Link}
              to={routesPaths.SIGNUP}>
                <Text>
                  Crear una nueva cuenta
                </Text>
            </ChakraLink>
          </Box>
        </Box>
      </Stack>
    </BaseContainer>
  );
}
