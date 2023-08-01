import * as puppeteer from "puppeteer";
import { 
	crowlingWebPage,
	CrawlerProgressCallback 
} from "../helpers/types.js";


export class Crawler{
	private webBrowser!: puppeteer.Browser;

	public static async Run() : Promise<Crawler>{
		const crawler = new Crawler();
		crawler.webBrowser =  await puppeteer.launch({
			headless: "new", // false - show browser | new == true (old) - hide browser
			defaultViewport: null,
		});
		return crawler;
	}

	public async Dispose() : Promise<void>{
		await this.webBrowser.close();
	}

	public async StartCrawling(
		baseUrl: URL, 
		regex: RegExp, 
		progressCallback: (progress: CrawlerProgressCallback) => void,
		timeout = 20_000
	) : Promise<crowlingWebPage[]>{
		let currentCrawlingWebPage: crowlingWebPage | undefined = {
			url: baseUrl.href,
			links: [],
			status: undefined
		};

		const pagesToCrawl: crowlingWebPage[] = [currentCrawlingWebPage];
		const crawledPages: crowlingWebPage[] = [];
		// Links that haven't passed regexp validation
		const seenLinks = new Set<string>();

		const incognitoContext = await this.webBrowser.createIncognitoBrowserContext();

		console.log(`(crawler ${process.pid}) Crawling starting`);
		while(pagesToCrawl.length > 0){
			/* Get the next page to crawl and add it to the seen links */
			currentCrawlingWebPage = pagesToCrawl.shift();
			if (currentCrawlingWebPage === undefined) {
				continue;
			}
			
			/** callback which sending actual crawler state */
			const progress : CrawlerProgressCallback = {
				status: "progress",
				pages: [...crawledPages, ...pagesToCrawl]
			}
			progressCallback(progress);
			
			if (!regex.test(currentCrawlingWebPage.url)){
				console.log(`(crawler ${process.pid}) Invalid URL: ${currentCrawlingWebPage.url}, current progress: ${crawledPages.length}/${crawledPages.length + pagesToCrawl.length}`);
				currentCrawlingWebPage.status = "notValidUrl"
				crawledPages.push(currentCrawlingWebPage);
				continue;
			}
			
			const page = await incognitoContext.newPage();

			try{
				const response = await page.goto(
					currentCrawlingWebPage.url, 
					{timeout: timeout, waitUntil: "domcontentloaded"}
				);
				seenLinks.add(currentCrawlingWebPage.url);
				console.log(`(crawler ${process.pid}) Crawling ${currentCrawlingWebPage.url}, current progress: ${crawledPages.length}/${crawledPages.length + pagesToCrawl.length}`);
	
				/* If the page was loaded successfully, crowl it */
				if (response?.ok()) {
					/* Get links from the page */
					currentCrawlingWebPage.crawlTimeStart = Date.now();
					currentCrawlingWebPage.title = await page.title();
					currentCrawlingWebPage.links = await this.getLinksFromPage(page, regex);
					currentCrawlingWebPage.crawlTimeEnd = Date.now();
					currentCrawlingWebPage.status = "success";
					crawledPages.push(currentCrawlingWebPage);
	
					/* Add the links to the pages to crawl from the crawled page */
					for (const link of currentCrawlingWebPage.links) {
						if (!seenLinks.has(link) && !pagesToCrawl.some(page => page.url === link)) {
							pagesToCrawl.push({
								url: link,
								links: [],
								status: undefined
							});
						}
					}
				}
				else{
					console.log(`(crawler ${process.pid}) Crawling failed  ${currentCrawlingWebPage.url}, current progress: ${crawledPages.length}/${crawledPages.length + pagesToCrawl.length}, response: ${response?.status}`);
					currentCrawlingWebPage.status = "failed"
					crawledPages.push(currentCrawlingWebPage);
				}
	
				/* Close the page */
			}
			catch (error){
				console.log(`(crawler ${process.pid}) Crawling failed ${currentCrawlingWebPage.url}, current progress: ${crawledPages.length}/${crawledPages.length + pagesToCrawl.length}, issue: ${error}`);
				currentCrawlingWebPage.status = "failed"
				crawledPages.push(currentCrawlingWebPage);
				continue;
			}

			await page.close();
		}

		console.log(`(crawler ${process.pid}) Crawling finished, total pages crawled: ${crawledPages.length + pagesToCrawl.length}`)
		return crawledPages;
	}

	/** 
	 * Gets all links from the page 
	 */
	async getLinksFromPage(page: puppeteer.Page, regex: RegExp) : Promise<string[]>{
		const dirtyLinks = await page.evaluate(() => {
			const links = Array.from(document.querySelectorAll("a"));
			return links.map(link => link.href);
		});
		
		return dirtyLinks;
	}
}
