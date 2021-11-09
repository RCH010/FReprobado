import React from 'react';
import { Text, Button, Box } from '@chakra-ui/react';
import { Link } from 'react-router-dom'
import { BaseContainer } from '../components/BaseContainer'

export const NotFound = () => {
  return (
    <BaseContainer>
        <Text fontSize='6xl'>¡Ohh no!</Text>
        <Text>La ruta parece tener algún error.</Text>
        <Box marginY='4em'>
          <Button as={Link} to='/' size='lg'>
            Ir al inicio
          </Button>
        </Box>
    </BaseContainer>
  )
}
