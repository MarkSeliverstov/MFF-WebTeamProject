import { writable } from 'svelte/store';
import type { Execution, WebsiteRecord } from '$lib/types';

export const websiteNodes = writable<
	Map<
		string,
		{
			data: {
				id: string;
				status: string;
                root: boolean;
				title: string | undefined;
				crawlTimeStart: number | undefined;
				crawlTimeEnd: number | undefined;
				links: string[];
			};
		}
	>
>(
	new Map<
		string,
		{
			data: {
				id: string;
				status: string;
                root: boolean;
				title: string | undefined;
				crawlTimeStart: number | undefined;
				crawlTimeEnd: number | undefined;
				links: string[];
			};
		}
	>()
);

export const websiteEdges = writable<
	{
		data: {
			source: string;
			target: string;
		};
	}[]
>([]);

export const domainNodes = writable<
	Map<
		string,
		{
			data: {
				id: string;
                title: string;
				links: string[];
                root: boolean;
                successCount: number;
                failedCount: number;
                invalidCount: number;
                notCrawledCount: number;
			};
		}
	>
>(
	new Map<
		string,
		{
			data: {
				id: string;
                title: string;
				links: string[];
                root: boolean;
                successCount: number;
                failedCount: number;
                invalidCount: number;
                notCrawledCount: number;
			};
		}
	>()
);


export const domainEdges = writable<
	Set<{
		data: {
			source: string;
			target: string;
		};
	}>
>(new Set<{
		data: {
			source: string;
			target: string;
		};
	}>());

export const executionsStore = writable<Execution[]>([]);

export const viewModeStore = writable(true);

export const livePreview = writable(false);

export const websiteGraphData = writable<{
	nodes: {
		data: {
			id: string;
			status: string;
			title: string | undefined;
			crawlTimeStart: number | undefined;
			crawlTimeEnd: number | undefined;
			links: string[];
		};
	}[];

	edges: {
		data: {
			source: string;
			target: string;
		};
	}[];
}>({ nodes: [], edges: [] });

export const domainGraphData = writable<{
	nodes: {
		data: {
			id: string;
			links: string[];
		};
	}[];

	edges: {
		data: {
			source: string;
			target: string;
		};
	}[];
}>({ nodes: [], edges: [] });

export const allExecutionsStore = writable<Execution[]>([]);

export const allRecordsStore = writable<WebsiteRecord[]>([]);

export const lastExecutionsMapStore = writable<Map<string, Execution[]>>();

export const activeSelectionStore = writable<WebsiteRecord[]>();