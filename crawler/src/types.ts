// Types for the exported graphQL data
export type ExportedWebPage = {
  ididentifier: string;
  label: string;
  url: string;
  regexp: string;
  tags: string[];
  active: boolean;
};

export type ExportedNode = {
  title?: string;
  url: string;
  crawlTime?: string;
  links: ExportedNode[];
  owner: ExportedWebPage;
};

export type CrowledWebPage = {
  url: string;
  title?: string;
  links: string[];
  crawlTimeStart?: number;
  crawlTimeEnd?: number;
  status: "pending" | "inProgress" | "failed" | "done" | "notValid";
};

export interface WebPageExecution {
  webPage: WebPageClientConfig;
  status: "success" | "queued" | "running" | "failed";
  message?: string;
  crawlTime: number;
  crawledPageCount: number;
  totalPageCount: number;
}

export interface WebPageClientConfig {
  identifier: string;
  /** user given label */
  label: string;
  /* where to start crawling */
  url: string;
  /* user given regex for deciding if page should be crawled */
  regexp: string;
  /* user given strings */
  tags: string[];
  /* if inactive, the site is not crawled based on the Periodicity */
  active: boolean;
  /* (minute, hour, day) - how often should the site be crawled */
  pereodicity: number;
}
