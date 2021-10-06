import { isDevelopment } from '@/shared/scripts/environment-variables'

const defaultArtUrl = new URL('../../../assets/img/defaultcover.jpg', import.meta.url);

console.log(import.meta)

const defaultArtPath = isDevelopment ? defaultArtUrl.pathname : defaultArtUrl.href;

export class BookModel {
  url: string;
  title: string;
  author: string;
  artUrl: string;

  constructor(url: string, title = 'unknown', author = 'unknown', artUrl = defaultArtPath) {
    this.url = url;
    this.title = title;
    this.author = author;
    this.artUrl = isDevelopment ? defaultArtPath : artUrl;
  }
}
