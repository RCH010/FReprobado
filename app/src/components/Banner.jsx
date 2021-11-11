import React, { useRef } from 'react';
import {
  Box,
  Flex,
  IconButton,
  useBreakpointValue,
  Text,
  Button,
  Slide,
  useDisclosure,
  useOutsideClick,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { menuItems } from '../utils/menuItems';
import MenuButton from './MenuButton';

export const Banner = () => {
  const slideRef = useRef(null);
  const { isOpen, onToggle, onClose } = useDisclosure();
  const displayHamburgerMenu = useBreakpointValue({ base: true, md: false });

  useOutsideClick({
    ref: slideRef,
    handler: () => onClose(),
  });

  return (
    <>
      <Flex
        flexDirection='row'
        width='100%'
        justifyContent='space-between'
        alignItems='center'
        padding='.8em'
      >
        <Flex alignItems='center' flexDir='row' h='100%'>
          {displayHamburgerMenu && (
            <IconButton
              aria-label='Menu'
              icon={<HamburgerIcon />}
              onClick={onToggle}
              marginRight='1em'
            />
          )}
          <Text fontSize='3xl' fontWeight='bold'>
            DMA
          </Text>
        </Flex>
        <Button variant='outline'>Cerrar Sesión</Button>
      </Flex>
      <Slide
        ref={slideRef}
        direction='left'
        in={isOpen}
        style={{
          zIndex: 10,
          width: 'auto',
          maxWidth: '80vw',
          overflow: 'hidden',
        }}
      >
        <Box padding='1em' height='100%' display='flex' bg='gray.700'>
          <Flex flexDir='column' py={4} display={{ md: 'none' }}>
            {menuItems.map((menuItem) => (
              <Box width='100%' key={menuItem.key}>
                <MenuButton menuItem={menuItem} omButtonClick={onClose} />
              </Box>
            ))}
          </Flex>
        </Box>
      </Slide>
    </>
  );
};
