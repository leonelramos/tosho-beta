import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Menu from '@/renderer/components/Menu';
import Library from '@/renderer/components/Library';

export default function App() {
  return (
    <ChakraProvider>
      <div id="outer-container">
        <Menu />
        <div id="page-wrap">
          <Library />
        </div>
      </div>
    </ChakraProvider>
  );
}
