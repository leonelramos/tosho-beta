import React, { useEffect, useState } from 'react';
import { Flex, Box } from '@chakra-ui/layout';
import LibraryBook from './LibraryBook';
import { getBooksAsync } from '../../Utils/bookcreator';

const isDevelopment = process.env.NODE_ENV === 'development';

const testBooksUrl = isDevelopment
  ? './testing-books'
  : new URL('../../../testing-books/Dracula.epub', import.meta.url).href;

export default function Library(props) {
  useEffect(async () => {
    getBooksAsync(testBooksUrl).then((books) => {
      console.log(books);
    });
  });

  const testDetails = {
    enable: true,
    status: 'READING',
    progress: 65,
  };

  return (
    <LibraryContainer>
      {/* {
        [...Array(10)].map((_, key) => <LibraryBook key={key} details={testDetails} book={testBook} />)
      } */}
    </LibraryContainer>
  );
}

function LibraryContainer(props) {
  return (
    <>
      <Flex
        flexWrap="wrap"
        justifyContent="space-between"
        margin="15px"
        className="library-container"
      >
        {props.children}
      </Flex>
    </>
  );
}
