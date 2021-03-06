import React from 'react';
import { Text, Button, Box } from '@chakra-ui/react';
import { Link } from 'react-router-dom'
import { BaseContainer } from '../components/BaseContainer'
import routesPaths from '../router/routes';

export const NotFound = () => {
  return (
    <BaseContainer>
        <Text fontSize='6xl'>¡Ohh no!</Text>
        <Text>La ruta parece tener algún error.</Text>
        <Box marginY='4em'>
          <Button as={Link} to={routesPaths.LOGIN} size='lg'>
            Ir al inicio
          </Button>
        </Box>
    </BaseContainer>
  )
}
