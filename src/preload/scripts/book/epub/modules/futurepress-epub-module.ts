import Epub, { Book } from "epubjs";
import IEpubModule, { EpubMetadata } from "@/preload/scripts/book/epub/modules/epub-module-interface";
import getZipItemURL from "@/preload/scripts/util/zip-utils";

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
	#coverRelativePath?: string


	async initAsync(url: string): Promise<void> {
		this.#initCalled = true;
		this.epub = Epub(url);
		if (!this.epub) {
			throw ("Error! Could not open epub file.")
		}
		const ready = await this.epub.ready;
		const details = ready[2];
		const coverRelativePath = (ready[3] as string).substring(1);
		this.#coverRelativePath = coverRelativePath;

		this.#metadata = {
			id: details.identifier,
			title: details.title,
			creator: details.creator,
			description: details.description,
			language: details.language,
			publisher: details.publisher,
			publishedDate: details.pubdate
		};

		this.#coverUrl = await getZipItemURL(url, coverRelativePath);
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

	getCoverRelativePath() {
		this.#checkInitialized();
		return this.#coverRelativePath || "";
	}

	getMetadata(): EpubMetadata {
		this.#checkInitialized();
		return this.#metadata;
	}
}