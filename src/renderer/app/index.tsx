import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Menu from '../components/Menu';
import Library from '../components/Library';

export default function App() {
  return (
    <ChakraProvider>
      <Menu />
      <Library />
    </ChakraProvider>
  );
}
