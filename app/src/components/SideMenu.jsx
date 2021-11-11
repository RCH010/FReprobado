import React from 'react';
import { Flex, useBreakpointValue } from '@chakra-ui/react';
import { menuItems } from '../utils/menuItems';
import MenuButton from './MenuButton';

export const SideMenu = () => {
  const displaySideMenu = useBreakpointValue({ base: false, md: true });
  return (
    <>
      {displaySideMenu && (
        <Flex
          bg='gray.700'
          roundedTopRight='3xl'
          flexDirection='column'
          height='100%'
          width='xs'
          padding='1em'
        >
          {menuItems.map((menuItem) => (
            <MenuButton
              key={menuItem.key}
              menuItem={menuItem}
            />
          ))}
        </Flex>
      )}
    </>
  );
};
