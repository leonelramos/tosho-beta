import { BookInfo, BookModel } from "@/shared/models/book";
import Epub, { Book } from "epubjs";
import { BookCreator } from "@/preload/scripts/book/creators/book-creator-interface";
import IEpubModule from "@/preload/scripts/book/epub/modules/epub-module-interface";
import { FPEpubModule } from "../epub/modules/futurepress-epub-module";
import { FileInfo } from "@/shared/models/file";
import path from "path";
import { FileTypes } from "@/preload/scripts/book/file-types-enum";

export class EpubCreator implements BookCreator {
    async createBookAsync(url: string): Promise<BookModel> {
        const epubModule = new FPEpubModule();
        await epubModule.initAsync(url);
        const metadata = epubModule.getMetadata();
        const bookInfo: BookInfo = {
            isbn: metadata.id,
            title: metadata.title,
            author: metadata.creator ? metadata.creator : "",
            description: metadata.description ? metadata.description : "",
            publishedDate: metadata.publishedDate ? metadata.publishedDate : ""
        }
        const fileInfo: FileInfo = {
            url: url,
            name: path.basename(url),
            type: FileTypes.EPUB,
            ext: ".epub",
            dateCreated: "",
            size: ""
        }
        return new BookModel(metadata.id, epubModule.getCoverUrl(), bookInfo, fileInfo);
    }
}


