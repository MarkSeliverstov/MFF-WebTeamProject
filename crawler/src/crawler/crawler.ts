import { CheerioAPI, load } from "cheerio";
import { URL } from "url";
import axios from 'axios';
import * as db from "../db/api";


import { CrowledWebPage } from "../types";
import { CrawlerTask } from "./types";
import { Execution, ExecutionStatus } from "../db/model";
import { threadId } from "worker_threads";


export class Crawler{
	private seenRoot = false;
	private groupId!: number;
	private recordId!: string;
	private rootExecution!: Execution;
	// List of pages to crawl
	private pagesToCrawl: CrowledWebPage[] = [];
	// List of pages that have been crawled
	private crawledPages: CrowledWebPage[] = [];
	// The current page being crawled
	private currentCrawlingWebPage?: CrowledWebPage;	
	// Set of seen links
	private seenPages = new Set<string>;
	private isAborted = false;

	private getTotalCrawledCount() {return this.crawledPages.length + this.pagesToCrawl.length;}

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
	private parseHtml(html: string, currentPage: CrowledWebPage){
		const $ = load(html);
		// Set the start time, title, links, and end time of the current page
		currentPage.title = $("title").text();
		currentPage.links = this.parseLinks($, currentPage.url);
		currentPage.status = "done";
	}

	private initCrawlingWebPage(link: string): CrowledWebPage{
		return {
			url: link,
			links: [],
			status: "pending"
		};
	}

	private async createExecution(page: CrowledWebPage): Promise<void>{
		const title = (page.title) ? page.title : "";
		const status = (page.status === "done") ? ExecutionStatus.SUCCESS : ExecutionStatus.FAILED;
		const newExecution: Execution = {
			url: page.url,
			title: title,
			crawlTimeStart: page.crawlTimeStart!,
			crawlTimeEnd: page.crawlTimeEnd!,
			links: page.links,
			groupId: this.groupId,
			ownerId: this.recordId,
			sitesCrawled: page.links.length,
			root: !this.seenRoot,
			status: status,
		};
		if (!this.seenRoot){
			const record = await db.getRecordByID(this.recordId);
			record.latestGroupId++;
			this.groupId = record.latestGroupId;
			newExecution.groupId = this.groupId;
			
			newExecution.status = ExecutionStatus.RUNNING;
			this.seenRoot = true;
			newExecution.id = await db.createExecution(newExecution);
			this.rootExecution = newExecution;
			
			await db.updateRecord(record);
		} else{
			await db.createExecution(newExecution);
			this.rootExecution.sitesCrawled = this.crawledPages.length;
			await db.updateExecution(this.rootExecution);
		}
	}

	// Function to start the crawling process
	public async StartCrawling(task: CrawlerTask) : Promise<number>{
		this.recordId = task.recordId;

		const baseUrl = task.url;
		const regex = RegExp(task.regex);

		// Initialize the first crawling page
		this.pagesToCrawl.push(this.initCrawlingWebPage(baseUrl));

		console.log(`(Crawler ${threadId}) Starting crawling ${this.recordId} record`);
		while(this.pagesToCrawl.length !== 0){
			if (this.isAborted) break;
			this.currentCrawlingWebPage = this.pagesToCrawl.shift();
			if (this.currentCrawlingWebPage === undefined) continue;

			this.currentCrawlingWebPage.crawlTimeStart = Date.now();
			this.currentCrawlingWebPage.status = "inProgress";

			this.seenPages.add(this.currentCrawlingWebPage.url);

			// If the current page's URL doesn't match the regex, continue to the next iteration
			if (!regex.test(this.currentCrawlingWebPage.url)){
				console.log(
					`(Crawler ${threadId}) Dont match to regex (${task.regex}): ${this.currentCrawlingWebPage.url}, `+
					`current progress: ${this.crawledPages.length}/${this.getTotalCrawledCount()}`
				);
				this.currentCrawlingWebPage.crawlTimeEnd = Date.now();
				this.currentCrawlingWebPage.status = "failed";
				this.crawledPages.push(this.currentCrawlingWebPage);
				await this.createExecution(this.currentCrawlingWebPage);
				continue;
			}

			try{
				// Fetch the page and add its URL to the seen links
				const html = await this.fetchPage(this.currentCrawlingWebPage.url);
				
				console.log(
					`(Crawler ${threadId}) Crawling ${this.currentCrawlingWebPage.url}, `+
					`current progress: ${this.crawledPages.length}/${this.getTotalCrawledCount()}`
				);

				// If the page was loaded successfully, crawl it
				if (html) {
					this.parseHtml(html, this.currentCrawlingWebPage);
					// Add the current page to the crawled pages
					this.crawledPages.push(this.currentCrawlingWebPage);
					// Add the links to the pages to crawl from the crawled page
					for (const link of this.currentCrawlingWebPage.links) {
						if (!this.seenPages.has(link) && !this.pagesToCrawl.some(page => page.url === link)) {
							this.pagesToCrawl.push(this.initCrawlingWebPage(link));
						}
					}
				} else {
					this.currentCrawlingWebPage.status = "done";
					this.crawledPages.push(this.currentCrawlingWebPage);
				}
			}
			catch (error) {
				// If an error occurred while fetching the page, log it and add the page to the crawled pages
				this.currentCrawlingWebPage.status = "failed";
				this.crawledPages.push(this.currentCrawlingWebPage);
				console.log(
					`(Crawler ${threadId}) Crawling failed ${this.currentCrawlingWebPage.url}, `+
					`current progress: ${this.crawledPages.length}/${this.getTotalCrawledCount()}, ${error}`
				);
			} finally {
				this.currentCrawlingWebPage.crawlTimeEnd = Date.now();
				await this.createExecution(this.currentCrawlingWebPage);
				// Calculate the time spent crawling the current page
				const crawlTime = this.currentCrawlingWebPage.crawlTimeEnd - this.currentCrawlingWebPage.crawlTimeStart;
				// console.log(`(crawler ${threadId}) Time spent crawling ${this.currentCrawlingWebPage.url}: ${crawlTime} ms`);
			}
		}

		console.log(`(Crawler ${threadId}) Crawling finished, total pages crawled: ${this.crawledPages.length}`);
		this.rootExecution.status = ExecutionStatus.SUCCESS;
		if (this.isAborted) this.rootExecution.status = ExecutionStatus.FAILED;
		this.rootExecution.crawlTimeEnd = Date.now();
		this.rootExecution.sitesCrawled = this.crawledPages.length;
		await db.updateExecution(this.rootExecution);
		return this.crawledPages.length;
	}

	public abort(): void {
		console.log(`(Crawler ${threadId}) Crawling aborting...`);
		this.isAborted = true;
	}
}