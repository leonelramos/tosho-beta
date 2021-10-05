import { readdir } from 'fs/promises';
import path from 'path';
import { BookModel } from '../Models/BookModel';
import supportedFileTypes from '../Shared/supported-file-types';

export async function getBooksAsync(url: string) {
  const absolutePath = path.resolve(url);

  const files = await readdir(absolutePath);
  const books = await createBooksAsync(absolutePath, files);
  return books as Promise<BookModel[]>;
}

async function createBooksAsync(absolutePath: string, files: string[]) {
  const dir = path.resolve(absolutePath);

  return new Promise((resolve) => {
    const books: BookModel[] = [];

    files.forEach((file) => {
      const filepath = path.join(dir, file);
      const isSupportFileType = supportedFileTypes.includes(path.extname(file));
      if (isSupportFileType) {
        books.push(new BookModel(filepath));
      }
    });
    resolve(books);
  });
}
