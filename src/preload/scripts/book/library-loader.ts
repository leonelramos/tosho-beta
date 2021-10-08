import path from 'path';
import { readdir } from 'fs/promises';
import supportedFileTypes from '@/shared/scripts/currently-supported-file-types';
import { BookModel } from '@/shared/models/book';
import { FileTypes } from '@/preload/scripts/book/file-types-enum';
import { EpubCreator } from '@/preload/scripts/book/creators/epub-creator';
import { BookCreator } from '@/preload/scripts/book/creators/book-creator-interface';

export async function importBooksAsync(url: string): Promise<BookModel[]> {
	const files = await readdir(url);
	return await createBooksAsync(url, files);
}

async function createBooksAsync(absolutePath: string, files: string[]): Promise<BookModel[]> {
	const supportedFiles = files.filter(file => {
		const ext = path.extname(file);
		const fileTypeSupported = supportedFileTypes.includes(ext);
		return fileTypeSupported;
	});

	const booksSettled = await Promise.allSettled(supportedFiles.map(file => {
		const pathName = path.join(absolutePath, file);
		const ext = path.extname(file);
		return createBookAsync(pathName, ext);
	}));

	let books: BookModel[] = [];
	booksSettled.forEach(book => {
		book.status === 'fulfilled' && books.push(book.value);
	});

	return books;
}

async function createBookAsync(url: string, ext: string): Promise<BookModel> {
	let creator: BookCreator;
	switch (ext) {
		case FileTypes.EPUB:
			creator = new EpubCreator();
			break;
		default:
			return Promise.reject("Book format not currently supported.");
	}
	return creator.createBookAsync(url);
}

