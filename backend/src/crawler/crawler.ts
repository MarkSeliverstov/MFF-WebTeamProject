import { CheerioAPI, load } from "cheerio";
import { URL } from "url";
import axios from 'axios';


import { 
	crowlingWebPage,
	CrawlerProgressCallback 
} from "../helpers/types.js";


export class Crawler{
	// List of pages to crawl
	private pagesToCrawl: crowlingWebPage[] = [];
	// List of pages that have been crawled
	private crawledPages: crowlingWebPage[] = [];
	// The current page being crawled
	private currentCrawlingWebPage?: crowlingWebPage;	

	// Function to fetch a page and return its text
	private async fetchPage(url: string): Promise<string> {
		const response = await axios.get(url);
		if (response.status !== 200) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		return response.data;
	}

	// Function to parse links from a Cheerio object
	private parseLinks($: CheerioAPI, baseUrl: string): string[] {
		const links: string[] = [];
		// Iterate over each 'a' tag
		$("a").each((index, element) => {
			let href = $(element).attr("href");
			// If href exists, add it to the links array
			if (href) {
				// Check if the href is a relative link
				if (!href.startsWith("http")) {
					href = new URL(href, baseUrl).href;
				}
				links.push(href);
			}
		});
		// Return the array of links
		return links;
	}

	// Function to parse links from a Cheerio object
	private parseHtml(html: string, currentPage: crowlingWebPage){
		const $ = load(html);
		// Set the start time, title, links, and end time of the current page
		currentPage.crawlTimeStart = Date.now();
		currentPage.title = $("title").text();
		currentPage.links = this.parseLinks($, currentPage.url);
		currentPage.crawlTimeEnd = Date.now();
		currentPage.status = "success";
		
		// Calculate the time spent crawling the current page
		const crawlTime = currentPage.crawlTimeEnd - currentPage.crawlTimeStart;
		console.log(`(crawler ${process.pid}) Time spent crawling ${currentPage.url}: ${crawlTime} ms`);
	}

	// Function to update the crawling progress
	private updateCrawlingProgress(progressCallback: (progress: CrawlerProgressCallback) => void): void {
		const progress : CrawlerProgressCallback = {
			status: "inProgress",
			// Combine crawled pages and pages to crawl for progress
			pages: [...this.crawledPages, ...this.pagesToCrawl]
		};
		// Call the progress callback with the progress
		progressCallback(progress);
	}

	private initCrawlingWebPage(link: string): crowlingWebPage{
		return {
			url: link,
			links: [],
			status: "pending"
		};
	}

	// Function to start the crawling process
	public async StartCrawling(
		baseUrl: URL, 
		regex: RegExp, 
		progressCallback: (progress: CrawlerProgressCallback) => void,
	) : Promise<crowlingWebPage[]>{
		// Initialize the first crawling page
		this.pagesToCrawl.push(this.initCrawlingWebPage(baseUrl.href));

		console.log(`(crawler ${process.pid}) Crawling starting`);
		while(this.pagesToCrawl.length > 0){
			this.currentCrawlingWebPage = this.pagesToCrawl.shift();

			// If the current page is undefined, that means there are no more pages to crawl
			if (this.currentCrawlingWebPage === undefined) break;
			
			this.updateCrawlingProgress(progressCallback);
			
			// If the current page's URL doesn't match the regex, continue to the next iteration
			if (!regex.test(this.currentCrawlingWebPage.url)){
				console.log(`(crawler ${process.pid}) Invalid URL: ${this.currentCrawlingWebPage.url}, current progress: ${this.crawledPages.length}/${this.crawledPages.length + this.pagesToCrawl.length}`
			);
				this.currentCrawlingWebPage.status = "failed";
				this.currentCrawlingWebPage.failedRiason = "Not valid URL";
				this.crawledPages.push(this.currentCrawlingWebPage);
				continue;
			}
			
			try{
				// Fetch the page and add its URL to the seen links
				const html = await this.fetchPage(this.currentCrawlingWebPage.url);
				console.log(`(crawler ${process.pid}) Crawling ${this.currentCrawlingWebPage.url}, current progress: ${this.crawledPages.length}/${this.crawledPages.length + this.pagesToCrawl.length}`);
	
				// If the page was loaded successfully, crawl it
				if (html) {
					this.parseHtml(html, this.currentCrawlingWebPage);
					// Add the current page to the crawled pages
					this.crawledPages.push(this.currentCrawlingWebPage);
	
					// Add the links to the pages to crawl from the crawled page
					for (const link of this.currentCrawlingWebPage.links) {
						if (!(link in this.crawledPages) && !this.pagesToCrawl.some(page => page.url === link)) {
							this.pagesToCrawl.push(this.initCrawlingWebPage(link));
						}
					}
				} else {
					this.currentCrawlingWebPage.status = "success";
					this.crawledPages.push(this.currentCrawlingWebPage);
				}
			}
			catch (error) {
				// If an error occurred while fetching the page, log it and add the page to the crawled pages
				this.currentCrawlingWebPage.status = "failed";
				this.crawledPages.push(this.currentCrawlingWebPage);
				console.log(`(crawler ${process.pid}) Crawling failed ${this.currentCrawlingWebPage.url}, current progress: ${this.crawledPages.length}/${this.crawledPages.length + this.pagesToCrawl.length},${error}`);
			}
		}

		console.log(`(crawler ${process.pid}) Crawling finished, total pages crawled: ${this.crawledPages.length + this.pagesToCrawl.length}`);
		return this.crawledPages;
	}
}



