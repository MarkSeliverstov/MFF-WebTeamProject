export interface Periodicity {
	minutes: number;
	hours: number;
	days: number;
}

export interface WebsiteRecord {
	id?: string;
	url: string;
	periodicity: Periodicity;
	regexp: string;
	label: string;
	active: boolean;
	tags: string[];
	latestGroupId: number; // Latest group id that was assigned for execution
}

export interface PreparedWebsiteRecord {
	url: string;
	periodicity: Periodicity;
	regexp: string;
	label: string;
	active: boolean;
	tags: string[];
	latestGroupId: number; // Latest group id that was assigned for execution
}

export enum ExecutionStatus {
	SUCCESS = "success",
	FAILED = "failed",
	RUNNING = "running",
	QUEUED = "queued"
}


// Represents a single web page of a crawling proccess
// Uniquely identified by the url, ownerId and groupId
export interface Execution {
	id?: string; // Id for mongo reasons
	ownerId: string; // Points to the website record where the crawling started
	groupId: number; // Belongs to all the pages that were crawled in the same crawling proccess
	root: boolean; // Start page of crawling
	url: string; // Url of the page that was crawled
	crawlTimeStart: number;
	crawlTimeEnd: number;
	status: ExecutionStatus;
	sitesCrawled: number;
	links: string[]; // Links that were found on the page,
	title: string;
}

export interface PreparedExecution {
	ownerId: string; // Points to the website record where the crawling started
	groupId: number; // Belongs to all the pages that were crawled in the same crawling proccess
	root: boolean; // Start page of crawling
	url: string; // Url of the page that was crawled
	crawlTimeStart: number;
	crawlTimeEnd: number;
	status: ExecutionStatus;
	sitesCrawled: number;
	links: string[]; // Links that were found on the page,
	title: string;
}

export interface Error {
	code: number;
	message: string;
}