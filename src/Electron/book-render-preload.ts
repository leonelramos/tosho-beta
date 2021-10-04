import path from 'path';
import { contextBridge } from 'electron';
import { isDevelopment } from '../Shared/environment-variables';
import renderBook from 'BookRendererAlias'
import { getBooksAsync } from 'BookCreatorAlias';

document.addEventListener('DOMContentLoaded', () => {
  const renderAreaId = 'book-render-area';
  document.body.innerHTML = `<div id="${renderAreaId}"></div>`;
});

contextBridge.exposeInMainWorld('pathApi', {
  resolve(url: string, ...pathArgs: string[]) {
    return path.resolve(url, ...pathArgs);
  },
  join(url: string, ...pathArgs: string[]) {
    return path.join(url, ...pathArgs);
  },
  rendererPath: path.resolve(__dirname, 'renderer')
});

contextBridge.exposeInMainWorld('envApi', {
  isDevelopment: isDevelopment
});

contextBridge.exposeInMainWorld('bookApi', {
  render(url: string) {
    renderBook(url);
  },
  async getBooks(url: string) {
    return await getBooksAsync(url);
  }
})