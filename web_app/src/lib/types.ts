import { ObjectId, type Collection } from 'mongodb';

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

export function isPeriodicity(obj: unknown): obj is Periodicity {
	if (
		obj &&
		typeof obj === 'object' &&
		'minutes' in obj &&
		'hours' in obj &&
		'days' in obj &&
		Object.keys(obj).length === 3
	) {
		const periodicity = obj as Periodicity;
		return (
			typeof periodicity.minutes === 'number' &&
			typeof periodicity.hours === 'number' &&
			typeof periodicity.days === 'number'
		);
	}
	return false;
}

export interface WebsiteRecord {
	id?: ObjectId;
	url: string;
	periodicity: Periodicity;
	regexp: string;
	label: string;
	active: boolean;
	tags: string[];
	latestGroupId: number; // Latest group id that was assigned for execution
}

export function isWebsiteRecordWithoutId(obj: unknown): obj is WebsiteRecord {
	if (
		obj &&
		typeof obj === 'object' &&
		'url' in obj &&
		'periodicity' in obj &&
		'regexp' in obj &&
		'label' in obj &&
		'active' in obj &&
		'tags' in obj &&
		'latestGroupId' in obj &&
		Object.keys(obj).length === 7
	) {
		const websiteRecord = obj as WebsiteRecord;
		return (
			typeof websiteRecord.url === 'string' &&
			isPeriodicity(websiteRecord.periodicity) &&
			typeof websiteRecord.regexp === 'string' &&
			typeof websiteRecord.label === 'string' &&
			typeof websiteRecord.active === 'boolean' &&
			Array.isArray(websiteRecord.tags) &&
			websiteRecord.tags.every((tag) => typeof tag === 'string') &&
			typeof websiteRecord.latestGroupId === 'number'
		);
	}
	return false;
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
	status: 'success' | 'failed' | 'running' | 'queued';
	sitesCrawled: number;
	links: string[]; // Links that were found on the page,
	title: string;
}

export function isExecutionWithoutId(obj: unknown): obj is Execution {
	if (
		obj &&
		typeof obj === 'object' &&
		'ownerId' in obj &&
		'groupId' in obj &&
		'root' in obj &&
		'url' in obj &&
		'crawlTimeStart' in obj &&
		'crawlTimeEnd' in obj &&
		'status' in obj &&
		'sitesCrawled' in obj &&
		'links' in obj &&
		'title' in obj &&
		Object.keys(obj).length === 10
	) {
		const execution = obj as Execution;
		return (
			execution.ownerId instanceof ObjectId &&
			typeof execution.groupId === 'number' &&
			typeof execution.root === 'boolean' &&
			typeof execution.url === 'string' &&
			typeof execution.crawlTimeStart === 'string' &&
			typeof execution.crawlTimeEnd === 'string' &&
			typeof execution.status === 'string' &&
			(execution.status === 'success' ||
				execution.status === 'failed' ||
				execution.status === 'running' ||
				execution.status === 'queued') &&
			typeof execution.sitesCrawled === 'number' &&
			Array.isArray(execution.links) &&
			execution.links.every((link) => typeof link === 'string') &&
			typeof execution.title === 'string'
		);
	}
	return false;
}

export interface Error {
	code: number;
	message: string;
}

export function isError(obj: unknown): obj is Error {
	if (
		obj &&
		typeof obj === 'object' &&
		'code' in obj &&
		'message' in obj &&
		Object.keys(obj).length === 2
	) {
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
