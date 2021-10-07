import FileModel, { FileInfo } from "@/shared/models/file";

export class BookModel extends FileModel {
  title: string;
  author: string;
  description: string;
  coverUrl: string;

  constructor(id: string, coverUrl: string, bookInfo: BookInfo, fileInfo: FileInfo) {
    super(id, fileInfo);
    this.coverUrl = coverUrl;
    this.title = bookInfo.title;
    this.author = bookInfo.author;
    this.description = bookInfo.description;
  }
}

export interface BookInfo {
  isbn: string,
  title: string,
  author: string,
  description: string,
  publishedDate: string
}
