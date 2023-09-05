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

// Other usefull types for crawling
export type StatusCode = {
	statusCode: number | "aborted" | "failed" | "skipped"
}

export type NodeWithStatusCode = ExportedNode & StatusCode