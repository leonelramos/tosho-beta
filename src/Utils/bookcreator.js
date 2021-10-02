import { readdir } from 'fs/promises';
import path from 'path'
import { BookModel } from '../Models/BookModel';

const isDevelopment = process.env.NODE_ENV === 'development';

export async function getBooksAsync(url) {
    const absolutePath = path.resolve(url);

    console.log(`Getting books from ${absolutePath}`)

    return readdir(absolutePath)
        .then(async files => { 
            const books = await createBooksAsync(absolutePath, files);
            console.log(`Final book list: ${books}`)
            return books;
        })
        .catch(err => console.log(`Error when trying to read from directory ${absolutePath} - ${err}`))
}

async function createBooksAsync(absolutePath, files) {
    const dir = path.resolve(absolutePath);
    let books = []

    files.forEach(file => {
        const filepath = path.join(dir, file);
        if(path.extname(file) === '.epub') {
            console.log(`${file} added!`)
            books.push(new BookModel(filepath))
        }
    });

    return books
}
