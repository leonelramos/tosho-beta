import { BookModel } from "@/shared/models/book";

export interface BookCreator {
	createBookAsync(url: string): Promise<BookModel>
}