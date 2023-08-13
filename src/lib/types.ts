import type { Collection, ObjectId } from "mongodb";

// custom type that is based on // "src/lib/server/src/helpers/types.ts" crowlingWebPage
export interface CrawledWebPage {
	url: string;
	title?: string;
	crawlTimeStart?: number;
	crawlTimeEnd?: number;
	links: string[];
	status: 'notYetCrawled' | 'success' | 'notValidUrl' | 'failed';
}

export interface Periodicity {
	unit: 'minutes' | 'hours' | 'days';
	interval: number;
}

export interface WebsiteRecord {
	id?: ObjectId
	url: string;
	periodicity: Periodicity;
	regexp: string;
	label: string;
	active: boolean;
	tags: string[];
}

export abstract class Model<T> {
	abstract collection: Collection;
	abstract create(item: T): Promise<ObjectId | null>;
	abstract getByID(id: string): Promise<T | null>;
	abstract update(id: string, updatedItem: T): Promise<T | null>;
	abstract delete(id: string): Promise<boolean>;
	abstract getAll(): Promise<T[]>;
}
