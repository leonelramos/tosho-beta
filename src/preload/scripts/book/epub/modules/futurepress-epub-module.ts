import Epub, { Book } from "epubjs";
import fs, { readFile } from 'fs/promises'
import IEpubModule, { EpubMetadata } from "@/preload/scripts/book/epub/modules/epub-module-interface";
import JSZip from "jszip";

export class FPEpubModule implements IEpubModule {
    private epub?: Book;
    private coverUrl = "";
    private metadata: EpubMetadata = {
        id: "",
        title: "",
        language: ""
    };
    private htmlCover = document.createElement('img');
    private isInitialized = false;
    private initCalled = false;

    async initAsync(url: string): Promise<void> {
        this.initCalled = true;
        this.epub = Epub(url);
        const ready = await this.epub.ready;
        const details = ready[2];
        const coverRelativePath = (ready[3] as string).substring(1);

        this.metadata = {
            id: details.identifier,
            title: details.title,
            creator: details.creator,
            description: details.description,
            language: "",
            publishedDate: ""
        };

        this.htmlCover = await getCoverImg(url, coverRelativePath);
        this.coverUrl = this.htmlCover.src;
        this.isInitialized = true;
    }

    private checkInitialized(): void {
        if (!this.initCalled) {
            throw ("Error! The initializer promise has not resolved.");
        }
        if (!this.isInitialized) {
            throw ("Error! You have not initialized the epub 'epub.initAsync()'.")
        }
    }

    getCoverUrl(): string {
        this.checkInitialized();
        return this.coverUrl;
    }

    getMetadata(): EpubMetadata {
        this.checkInitialized();
        return this.metadata;
    }

    getImageElement(): HTMLImageElement {
        this.checkInitialized();
        return this.htmlCover;
    }
}

async function getCoverImg(url: string, coverRelativeUrl: string) {
    const zip = new JSZip();
    const data = await fs.readFile(url);
    const result = await zip.loadAsync(data);
    const blob = await result.files[coverRelativeUrl].async('blob');
    const img = new Image();
    img.src = URL.createObjectURL(blob);
    return img;
}



