import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Menu from '../Components/Menu';
import Library from '../Components/Library';

export default function App() {
  return (
    <ChakraProvider>
      <Menu />
      <Library />
    </ChakraProvider>
  );
}
