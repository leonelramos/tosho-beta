import { BrowserWindow, contextBridge, dialog, ipcRenderer } from 'electron';
import path, { join, dirname } from 'path';
import { isDevelopment } from '@/shared/scripts/environment-variables';
import renderBook from '@/preload/scripts/book/renderers/book-renderer'
import { importBooksAsync } from '@/preload/scripts/book/library-loader';
import apiNames from '@/shared/scripts/api-names'
import eventNames from '@/shared/scripts/event-names'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'
import { BookModel } from '@/shared/models/book';

type Data = {
	books: BookModel[]
};

let db: Low<Data>;

initDb();

window.onload = init;

function init() {
	console.log("app preload")
	const renderAreaId = 'book-render-area';
	const renderArea = document.createElement('div');
	renderArea.id = renderAreaId;
	document.body.appendChild(renderArea);
};

contextBridge.exposeInMainWorld(apiNames.pathApi, {
	resolve(url: string, ...pathArgs: string[]) {
		return path.resolve(url, ...pathArgs);
	},
	join(url: string, ...pathArgs: string[]) {
		return path.join(url, ...pathArgs);
	},
	rendererPath: path.resolve(__dirname, 'renderer')
});

contextBridge.exposeInMainWorld(apiNames.envApi, {
	isDevelopment: isDevelopment
});

contextBridge.exposeInMainWorld(apiNames.bookApi, {
	render(url: string) {
		renderBook(url);
	},
	async importFolder(url: string) {
		const books = await importBooksAsync(url);
		saveBooks(books);
		return books;
	}
});

contextBridge.exposeInMainWorld(apiNames.systemApi, {
	async getDialogFolderUrl() {
		return await ipcRenderer.invoke(eventNames.showDialogFolder);
	}
});

contextBridge.exposeInMainWorld(apiNames.dbApi, {
	getToshoLibrary(): BookModel[] {
		// create image blobs and reset urls
		return db.data ? db.data.books : [];
	}
});

function saveBooks(books: BookModel[]) {
	books.forEach(book => { if (db.data) db.data.books.push(book) });
	db.write();
}

async function initDb() {
	const _dirname = dirname(fileURLToPath(import.meta.url));
	const file = join(_dirname, 'db.json');
	const adapter = new JSONFile<Data>(file);
	db = new Low<Data>(adapter);
	await db.read();
	db.data = db.data || { books: [] };
	console.log(db.data);
}



