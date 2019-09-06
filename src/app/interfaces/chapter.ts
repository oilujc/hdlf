import { Subchapter } from "./subchapter";
import { Content } from "./content";

export interface Chapter {
	id: number,
	title: string,
	chapter: string,
	page_type: string,
	page_content: Content[],
	subchapter: Subchapter[]
}
