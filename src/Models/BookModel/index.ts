const isDevelopment = process.env.NODE_ENV === 'development';

let defaultArtUrl = new URL("../../Assets/Img/defaultcover.jpg", import.meta.url);

let defaultArtPath = isDevelopment ? defaultArtUrl.pathname : defaultArtUrl.href;

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
