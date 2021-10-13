export default interface IEpubModule {
	initAsync(url: string): Promise<void>,
	getCoverUrl(): string,
	getMetadata(): EpubMetadata,
}

export interface EpubMetadata {
	id: string,
	title: string,
	language: string,
	creator?: string,
	edition?: string,
	description?: string,
	publisher?: string,
	publishedDate?: string
}