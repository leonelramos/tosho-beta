import path from 'path';
import JSZip from 'jszip';
import Epub, { Book } from 'epubjs';
import fs, { readdir } from 'fs/promises';
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
      return createBookPromise(pathName);
    }
  }));
}

function createBookPromise(url: string): Promise<BookModel> {
  return new Promise(async (resolve) => {
    const book = await createBook(url);
    if (book)
      resolve(book);
    else
      reject(book)
  });
}

async function createBook(url: string) {
  const book = Epub(url);

  let id = "unavailable";
  let title = "unavailable";
  let author = "unavailable";
  let description = "unavailable"
  let coverUrl = "../" + defaultCoverUrl;

  let bookModel: BookModel | null;

  const ready = await book.ready;
  const details = ready[2];

  id = details.identifier;
  title = details.title;
  author = details.creator;
  description = details.description;
  coverUrl = await getCoverUrl(url, (ready[3] as string).substring(1));
  bookModel = new BookModel(id, url, title, author, description, coverUrl);
  return bookModel;
}

var cachedCoverImages: HTMLImageElement[] = []

async function getCoverUrl(url: string, coverRelativeUrl: string) {
  const zip = new JSZip();
  const data = await fs.readFile(url);
  console.log(data);
  const result = await zip.loadAsync(data);

  const blob = await result.files[coverRelativeUrl.trim()].async('blob'); //failing here at the moment, async undefined for some reason

  const img = new Image();
  img.src = URL.createObjectURL(blob);
  cachedCoverImages.push(img);
  return img.src;
}
