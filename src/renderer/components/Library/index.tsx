import React, { useEffect, useState } from 'react';
import { Flex } from '@chakra-ui/layout';
import LibraryBook from '@/renderer/components/LibraryBook';
import { BookModel } from '@/shared/models/book';
import CommonProps from '@/renderer/scripts/common-props';

const rendererPath = window['pathApi'].rendererPath;
const libraryUrl = window['envApi'].isDevelopment
  ? window['pathApi'].resolve(rendererPath, '..', '..', 'library')
  : '/library';

type LibraryProps = CommonProps;

export default function Library(props: LibraryProps) {
  const [books, setBooks] = useState<BookModel[]>([]);

  useEffect(() => {
    window['bookApi']
      .getLibrary(libraryUrl)
      .then((foundBooks: BookModel[]) => {
        if (foundBooks) {
          setBooks(foundBooks);
        }
      })
      .catch((err: Error) => {
        throw `Error getting your books! ${err}`;
      });
  }, []);

  const testDetails = {
    enable: true,
    status: 'UNREAD',
    progress: 0
  };

  return (
    <LibraryContainer>
      {books.map((book: BookModel, key: number) => {
        return <LibraryBook key={key} book={book} details={testDetails} />;
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
        margin='15px'
        className='library-container file-upload-drag-zone'
      >
        {props.children}
      </Flex>
    </>
  );
}

const folderPicker = document.getElementById('add-folder');

if (folderPicker) {
  folderPicker.onchange = (e: Event) => {
    if (e) {
      (e.target as HTMLInputElement).files;
    }
  };
}
