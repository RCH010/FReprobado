/**
 * This component is created because
 * there's an issue with chakra v1.6.12
 * https://github.com/chakra-ui/chakra-ui/issues/4987
 * it has been solved, but next release is still pending
 */

import { useEffect } from 'react';
import { useColorMode } from '@chakra-ui/color-mode';

export const ForceColorMode = ({ mode, children }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    localStorage.removeItem('chakra-ui-color-mode');
  }, []);

  useEffect(() => {
    if (colorMode === mode) return;
    toggleColorMode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorMode]);

  return children;
};
