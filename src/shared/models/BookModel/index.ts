import { isDevelopment } from '@/shared/scripts/environment-variables'
console.log(import.meta)

export class BookModel {
  identifier: string;
  url: string;
  title: string;
  author: string;
  description: string;
  coverUrl: string;

  constructor(identifier: string, url: string, title: string, author: string, description: string, coverUrl: string) {
    this.identifier = identifier;
    this.url = url;
    this.title = title;
    this.author = author;
    this.description = description;
    this.coverUrl = coverUrl;
  }
}
