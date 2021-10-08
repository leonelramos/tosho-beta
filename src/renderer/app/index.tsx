import React, { createContext } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Menu from '@/renderer/components/Menu';
import Library from '@/renderer/components/Library';
import { BookModel } from '@/shared/models/book';

const LibraryContext = createContext<BookModel[]>([]);

export default function App() {
  return (
    <ChakraProvider>
      <div id='outer-container'>
        <LibraryContext.Provider value={[]}>
          <Menu />
          <div id='page-wrap'>
            <Library />
          </div>
        </LibraryContext.Provider>
      </div>
    </ChakraProvider>
  );
}
