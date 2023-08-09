
// custom type that is based on // "src/lib/server/src/helpers/types.ts" crowlingWebPage
export interface CrawledWebPage {
    url: string;
    title?: string;
    crawlTimeStart?: number;
    crawlTimeEnd?: number;
    links: string[];
    status: "notYetCrawled" | "success" | "notValidUrl" | "failed";
}