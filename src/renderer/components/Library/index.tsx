import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Flex } from '@chakra-ui/layout';
import LibraryBook from '@/renderer/components/LibraryBook';
import { BookModel } from '@/shared/models/book';
import CommonProps from '@/renderer/scripts/common-props';

const rendererPath = window.pathApi.rendererPath;
const libraryUrl = window.envApi.isDevelopment
  ? window.pathApi.resolve(rendererPath, '..', '..', 'library')
  : '/library';

type LibraryProps = CommonProps;

export default function Library(props: LibraryProps) {
  const [books, setBooks] = useState<BookModel[]>([]);

  useEffect(() => {
    grabBooksFrom(libraryUrl).then((libraryBooks) => {
      if (libraryBooks) {
        updateBooks(libraryBooks, books, setBooks);
      }
    });
  }, []);

  window.onmessage = (event) => {
    grabBooksFrom(event.data).then((foundBooks) => {
      if (foundBooks) {
        updateBooks(foundBooks, books, setBooks);
      }
    });
  };

  const placeholderDetails = {
    enable: true,
    status: 'UNREAD',
    progress: 0
  };

  return (
    <LibraryContainer>
      {books.map((book: BookModel, key: number) => {
        return (
          <LibraryBook key={key} book={book} details={placeholderDetails} />
        );
      })}
    </LibraryContainer>
  );
}

function LibraryContainer(props: CommonProps) {
  return (
    <>
      <Flex
        flexWrap='wrap'
        justifyContent='space-between'
        padding='15px'
        className='library-container file-upload-drag-zone'
      >
        {props.children}
      </Flex>
    </>
  );
}

function updateBooks(
  booksToAdd: BookModel[],
  books: BookModel[],
  setBooks: Dispatch<SetStateAction<BookModel[]>>
) {
  const newBooks = booksToAdd.filter((bookToAdd) => !books.includes(bookToAdd));
  setBooks([...books, ...newBooks]);
}

async function grabBooksFrom(url: string): Promise<BookModel[]> {
  const books = await window.bookApi.importFolder(url);
  return books;
}
