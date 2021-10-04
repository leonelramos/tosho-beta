import React, { useEffect, useState } from 'react';
import path from 'path'
import { Flex } from '@chakra-ui/layout';
import LibraryBook from './LibraryBook';
import { getBooksAsync } from 'BookCreatorAlias';
import { BookModel } from 'src/Models/BookModel';
import CommonProps from 'CommonPropsAlias';

const isDevelopment = process.env.NODE_ENV === 'development';

const testBooksUrl = isDevelopment
  ? './testing-books'
  : path.resolve(__dirname, "..", "..", "testing-books");

  console.log(testBooksUrl);


interface LibraryProps extends CommonProps {

}

export default function Library(props: LibraryProps) {
  const [books, setBooks] = useState<BookModel[]>([]);

  useEffect(() => {
    getBooksAsync(testBooksUrl).then((books) => {
      if(books) {
        setBooks(books);
      }
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
        books.map((book: BookModel, key: number) => {
          return <LibraryBook key={key} book={book} details={testDetails}/>
        })
      }
    </LibraryContainer>
  );
}

function LibraryContainer(props: CommonProps) {
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
