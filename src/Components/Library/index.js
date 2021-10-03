import React, { useEffect, useState } from 'react';
import path from 'path'
import { Flex, Box } from '@chakra-ui/layout';
import LibraryBook from './LibraryBook';
import { getBooksAsync } from '../../Utils/book-creator';

const isDevelopment = process.env.NODE_ENV === 'development';

const testBooksUrl = isDevelopment
  ? './testing-books'
  : path.resolve(__dirname, "..", "..", "testing-books")

  console.log(testBooksUrl)

export default function Library(props) {
  const [books, setBooks] = useState([]);

  useEffect(async () => {
    getBooksAsync(testBooksUrl).then((books) => {
      setBooks(books);
    });
  }, []);

  const testDetails = {
    enable: true,
    status: 'READING',
    progress: 65,
  };

  return (
    <LibraryContainer>
      {
        books.map((book, key) => {
          return <LibraryBook key={key} book={book} details={testDetails}/>
        })
      }
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
