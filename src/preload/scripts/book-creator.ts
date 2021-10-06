import path from 'path';
import Epub, { Book } from 'epubjs';
import { readdir } from 'fs/promises';
import supportedFileTypes from '@/shared/scripts/supported-file-types';
import { BookModel } from '@/shared/models/BookModel';
import defaultCoverUrl from '@/assets/img/defaultcover.jpg';
import { reject } from 'lodash';

export async function getBooksAsync(url: string) {
  const files = await readdir(url);
  const books = await createBooksAsync(url, files);
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
    if (book)
      resolve(book);
    else
      reject(book)
  });
}

async function createBook(url: string) {
  const book = Epub(url);
  console.log(book);

  let id = "unavailable";
  let title = "unavailable";
  let author = "unavailable";
  let description = "unavailable"
  let coverUrl = "../" + defaultCoverUrl;
  console.log(coverUrl);

  let bookModel: BookModel | null;

  const ready = await book.ready;
  const details = ready[2];

  console.log(book.packaging.metadata);
  console.log(details);

  id = details.identifier;
  title = details.title;
  author = details.creator;
  description = details.description;

  bookModel = new BookModel(id, url, title, author, description, coverUrl);
  return bookModel;
}
