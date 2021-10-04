import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Menu from '../Components/Menu';
import Library from '../Components/Library';

interface props {
  children?: Element
}

export default function App(props: props) {
  return (
    <ChakraProvider>
      <Menu />
      <Library />
    </ChakraProvider>
  );
}
