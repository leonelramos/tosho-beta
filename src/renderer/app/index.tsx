import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Menu from '@/renderer/components/Menu';
import Library from '@/renderer/components/Library';

export default function App() {
  return (
    <ChakraProvider>
      <Menu />
      <Library />
    </ChakraProvider>
  );
}
