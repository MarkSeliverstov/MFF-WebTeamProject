// Types for the web page data
export interface crowlingWebPage {
	url: string
	title?: string;
	crawlTimeStart?: number;
	crawlTimeEnd?: number;
	links: string[];
	status: "pending" | "inProgress" | "success"  |  "failed"
	failedRiason?: string
}

export interface CrawlerProgressCallback{
	status: "inProgress" | "done";
	pages: crowlingWebPage[]
}

export interface webPageExecution {
	webPage: webPageClientConfig;
	status: "success" | "queued" | "running" | "failed";
	message?: string;
	crawlTime: number;
	crawledPageCount: number;
	totalPageCount: number;
}

export interface webPageClientConfig {
	identifier: string;
	/** user given label */
	label: string;
	/* where to start crawling */
	url: string;
	/* (required)
  when crawler found a link, it will check if it matches this regexp */
	regexp: string;
	/* user given strings */
	tags: string[];
	/* if inactive, the site is not crawled based on the Periodicity */
	active: boolean;
	/* (minute, hour, day) - how often should the site be crawled */
	pereodicity: number;
}

/* How the web pages can be filtered and sorted */
export type filteredWebPagesViewBy = "url" | "label" | "tags";
export type sortedWebPagesViewBy = "url" | "crawlTime";

// Types for the exported graphQL data

export type ExportedWebPage = {
	ididentifier: string;
	label: string;
	url: string;
	regexp: string;
	tags: string[];
	active: boolean;
}

export type ExportedNode = {
	title?: string;
	url: string;
	crawlTime?: string;
	links: ExportedNode[];
	owner: ExportedWebPage;
};
