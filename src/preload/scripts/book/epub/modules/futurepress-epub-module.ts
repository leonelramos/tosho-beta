import Epub, { Book } from "epubjs";
import fs from 'fs/promises'
import IEpubModule, { EpubMetadata } from "@/preload/scripts/book/epub/modules/epub-module-interface";
import JSZip from "jszip";

export class FPEpubModule implements IEpubModule {
	epub?: Book;
	#coverUrl = "";
	#metadata: EpubMetadata = {
		id: "",
		title: "",
		language: ""
	};
	#isInitialized = false;
	#initCalled = false;

	async initAsync(url: string): Promise<void> {
		this.#initCalled = true;
		this.epub = Epub(url);
		if (!this.epub) {
			throw ("Error! Could not open epub file.")
		}
		console.log(this.epub)
		const ready = await this.epub.ready;
		const details = ready[2];
		const coverRelativePath = (ready[3] as string).substring(1);

		this.#metadata = {
			id: details.identifier,
			title: details.title,
			creator: details.creator,
			description: details.description,
			language: details.language,
			publisher: details.publisher,
			publishedDate: details.pubdate
		};

		this.#coverUrl = await getCoverImgURL(url, coverRelativePath);
		this.#isInitialized = true;
	}

	#checkInitialized(): void {
		if (!this.#initCalled) {
			throw ("Error! The initializer promise has not resolved.");
		}
		if (!this.#isInitialized) {
			throw ("Error! You have not initialized the epub, call 'epub.initAsync()'.")
		}
	}

	getCoverUrl(): string {
		this.#checkInitialized();
		return this.#coverUrl;
	}

	getMetadata(): EpubMetadata {
		this.#checkInitialized();
		return this.#metadata;
	}
}

async function getCoverImgURL(url: string, coverRelativeUrl: string) {
	const zip = new JSZip();
	const data = await fs.readFile(url);
	const result = await zip.loadAsync(data);
	const blob = await result.files[coverRelativeUrl].async('blob');
	return URL.createObjectURL(blob);
}



