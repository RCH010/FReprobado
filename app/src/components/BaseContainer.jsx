import React  from 'react';
import { Flex } from '@chakra-ui/layout';

/**
 * @function ContainerBase
 * @description Base container for views (100% on window)
 * @param {React.FC} children 
 * @returns 
 */
export const BaseContainer = ({children}) => {
  return (
    <Flex
      flexGrow={1}
      flexDir='column'
      h={'100%'}
      w={'100%'}
      align={'center'}
      justify={'center'}
    >
      {children}
    </Flex>
  )
}
