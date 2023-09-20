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
	minutes: number;
	hours: number;
	days: number;
}

export interface WebsiteRecord {
	id?: ObjectId
	url: string;
	periodicity?: Periodicity;
	regexp: string;
	label: string;
	active: boolean;
	tags: string[];
	latestGroupId: number; // Latest group id that was assigned for execution
}

// Represents a single web page of a crawling proccess
// Uniquely identified by the url, ownerId and groupId
export interface Execution {
	id?: ObjectId; // Id for mongo reasons
	ownerId: ObjectId; // Points to the website record where the crawling started
	groupId: number; // Belongs to all the pages that were crawled in the same crawling proccess
	root: boolean; // Start page of crawling
	url: string; // Url of the page that was crawled
	crawlTimeStart: Date;
	crawlTimeEnd: Date;
	status: 'success' | 'failed' | 'running';
	sitesCrawled: number;
	links: string[]; // Links that were found on the page,
	title: string;
}

export interface Error {
	code: number;
	message: string;
}

export function isError(obj: unknown): obj is Error {
	if (obj && typeof obj === 'object' && 'code' in obj && 'message' in obj && Object.keys(obj).length === 2) {
		const error = obj as Error;
		return typeof error.code === 'number' && typeof error.message === 'string';
	}
	return false;
}


export abstract class Model<T> {
	abstract collection: Collection;
	abstract create(item: T): Promise<ObjectId | Error>;
	abstract getByID(id: string): Promise<T | Error>;
	abstract update(id: string, updatedItem: T): Promise<T | Error>;
	abstract delete(id: string): Promise<boolean | Error>;
	abstract getAll(): Promise<T[] | Error>;
}
