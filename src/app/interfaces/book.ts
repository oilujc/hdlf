import { Chapter } from "./chapter";

export interface Book {
	id: number,
	title: string,
	subtitle: string,
	chapter: Chapter[]
}
