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
// import { useNavigate } from 'react-router';
import { Link } from "react-router-dom";
import { BaseContainer } from '../../components/BaseContainer';
import routesPaths from '../../router/routes';
// import { AuthContext } from '../../providers/AuthProvider';


export const SingUp = () => {
  // const { login } = useContext(AuthContext);
  // const navigate = useNavigate();
  const { register, formState: { errors }, handleSubmit, watch } = useForm();
  const firstPassword = watch('password');
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
    // TODO sing up request (onSuccess and onError)
  }

  return (
    <BaseContainer>
      <Stack align={'center'} spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Heading fontSize={'4xl'}>Registrarse</Heading>
        <Box
          p={8}
          minW='sm  '
          rounded={'lg'}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl
              mb='4'
              isInvalid={Boolean(errors.name)}>
              <FormLabel htmlFor="email">Nombre</FormLabel>
              <Input
                name="name"
                type="text"
                autoComplete='on'
                placeholder=''
                {...register('name', {
                  required: 'Por favor ingresa tu nombre',
                  minLength: {
                    value: 2,
                    message: 'Tu nombre debe ser mayor a dos caracteres',
                  },
                })}
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>

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
                    message: 'La contraseña debe ser mayor a 8 caracteres'
                  }  
                })}
              />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              mb='4'
              
              isInvalid={Boolean(errors.password2)}>
              <FormLabel htmlFor='password2'>Repite tu contraseña</FormLabel>
              <Input
                name='password2'
                type="password"
                autoComplete='on'
                {...register('password2', {
                  required: true,
                  validate: value => value === firstPassword || 'Las contraseñas deben ser iguales'
                })}
              />
              <FormErrorMessage>
                {errors.password2 && errors.password2.message}
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
              to={routesPaths.LOGIN}>
                <Text>
                  ¿Ya con cuenta? Inicar Sesión
                </Text>
            </ChakraLink>
          </Box>
        </Box>
      </Stack>
    </BaseContainer>
  );
}
