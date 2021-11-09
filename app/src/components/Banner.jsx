import React, { useContext } from 'react';
import {
  Box,
  Flex,
  IconButton,
  useBreakpointValue,
  Text,
  Button,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { DashboardContext } from '../providers/DashboardProvider';


export const Banner = () => {
  const {dashboardContext} = useContext(DashboardContext)
  const displayHamburguerMenu = useBreakpointValue({ base: true, md: false });

  const onHamburguerPress = () => {

  };

  return (
    <Flex
      flexDirection="row"
      width="100%"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box h="100%">
        {displayHamburguerMenu && (
          <IconButton
            aria-label="Menu"
            icon={<HamburgerIcon />}
            onClick={onHamburguerPress}
          />
        )}
        <Text fontSize="xl" fontWeight="bold">
          DMA
        </Text>
      </Box>

      <Box h='100%'>
        <Button
          variant='outline'
        >
          Cerrar Sesión
        </Button>
      </Box>
    </Flex>
  );
};
