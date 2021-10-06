import { readdir } from 'fs/promises';
import { random, reject } from 'lodash';
import path from 'path';
import { BookModel } from '../../shared/models/BookModel';
import supportedFileTypes from '../../shared/scripts/supported-file-types';

export async function getBooksAsync(url: string) {
  const absolutePath = path.resolve(url);

  const files = await readdir(absolutePath);
  const books = await createBooksAsync(absolutePath, files);
  return books;
}

async function createBooksAsync(absolutePath: string, files: string[]) {
  const dir = path.resolve(absolutePath);

  return Promise.all(files.map(file => {
    const pathName = path.join(dir, file);
    const fileTypeSupported = supportedFileTypes.includes(path.extname(file));
    if (fileTypeSupported) {
      return createBookAsync(pathName);
    }
  }));
}

async function createBookAsync(url: string): Promise<BookModel> {
  return new Promise((resolve) => {
    const book = createBook(url);
    resolve(book);
  });
}

function createBook(url: string) {
  const book = new BookModel(url);
  return book;
}
