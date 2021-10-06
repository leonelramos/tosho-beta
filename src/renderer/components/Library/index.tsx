import React, { useEffect, useState } from 'react';
import { Flex } from '@chakra-ui/layout';
import LibraryBook from '@/renderer/components/LibraryBook';
import { BookModel } from '@/shared/models/BookModel';
import CommonProps from '@/renderer/scripts/common-props';

const rendererPath = window['pathApi'].rendererPath;
const libraryUrl = window['envApi'].isDevelopment
  ? '../library'
  : window['pathApi'].resolve(rendererPath, '..', '..', 'library');

type LibraryProps = CommonProps

export default function Library(props: LibraryProps) {
  const [books, setBooks] = useState<BookModel[]>([]);

  useEffect(() => {
    window['bookApi'].getBooks(libraryUrl)
    .then((foundBooks: BookModel[]) => { 
      if(foundBooks) {
        setBooks(foundBooks);
      }
    })
    .catch((err: Error) => console.log(`Error getting your books! ${err}`));
  }, []);

  const testDetails = {
    enable: true,
    status: 'UNREAD',
    progress: 0,
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
