import { Flex, Button } from '@chakra-ui/react'
import React from 'react'

export const SideMenu = () => {
  return (
    <Flex
      flexDirection='column'
      height='100%'
      width='xs'
    >
      <Button>
        Nueva Evaluación
      </Button>
      <Button>
        Evaluaciones Pasadas
      </Button>
    </Flex>
  )
}
