import React from 'react';
import { Flex, Box } from '@chakra-ui/react';
import { Banner } from '../../components/Banner';
import { DashboardSections } from './DashboardSections';

export const Dashboard = () => {
  return (
    <Flex
      flexGrow={1}
      flexDir='column'
      height='100%'
      width='100%'
    >
      <Banner />
      <Flex
        flexDir='row'
        height='100%'
        width='100%'
      >
        <Box
          height='100%'
          width='100%'
          padding='1em'
        >
          <DashboardSections />
        </Box>
      </Flex>
    </Flex>
  )
}
