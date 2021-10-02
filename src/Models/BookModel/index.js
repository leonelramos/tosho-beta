const isDevelopment = process.env.NODE_ENV === 'development';

let defaultArtUrl = new URL("../../Assets/Img/defaultcover.jpg", import.meta.url);

defaultArtUrl = isDevelopment ? defaultArtUrl.pathname : defaultArtUrl.href;

export class BookModel {
  constructor(url, title = 'unknown', author = 'unknown', artUrl = defaultArtUrl) {
    this.url = url;
    this.title = title;
    this.author = author;
    this.artUrl = isDevelopment ? defaultArtUrl : artUrl;
  }
}
