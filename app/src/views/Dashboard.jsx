import React from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';
import { Banner } from '../components/Banner';
import { SideMenu } from '../components/SideMenu';

export const Dashboard = () => {
  return (
    <Flex
      flexGrow={1}
      flexDir='column'
      h={'100%'}
      w={'100%'}
    >
      <Banner />
      <Flex
        flexDir='row'
        h={'100%'}
        w={'100%'}
      >
        <SideMenu />
        <Box>
          <Text>Este es el dashboard</Text>
        </Box>
      </Flex>
    </Flex>
  )
}
