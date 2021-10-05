import React, { useEffect, useState } from 'react';
import { Flex } from '@chakra-ui/layout';
import LibraryBook from './LibraryBook';
import { getBooksAsync } from 'BookCreatorAlias';
import { BookModel } from 'src/Models/BookModel';
import CommonProps from 'CommonPropsAlias';

const rendererPath = window['pathApi'].rendererPath;
const testBooksUrl = window['envApi'].isDevelopment
  ? './testing-books'
  : window['pathApi'].resolve(rendererPath, '..', '..', 'testing-books');

type LibraryProps = CommonProps

export default function Library(props: LibraryProps) {
  const [books, setBooks] = useState<BookModel[]>([]);

  useEffect(() => {
    window['bookApi'].getBooks(testBooksUrl)
    .then((foundBooks: BookModel[]) => { 
      if(foundBooks) {
        setBooks(foundBooks);
      }
    })
    .catch((err: Error) => console.log(`Error getting your books! ${err}`));
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
