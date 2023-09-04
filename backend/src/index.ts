import { Crawler } from "./crawler/crawler.js";
import { runServer } from "./server.js";
import { crowlingWebPage, CrawlerProgressCallback } from "./helpers/types.js";
import { readFileSync, writeFileSync } from "fs";

// The entry point in the backed of crawler
async function Run(): Promise<void> {
    console.log("Backend starting...");
    // run workers
    // init db
    // init manager
    await runServer(5001);
    console.log("Backend ready, luckily!");
}


async function ManualCrawl(){
    const urlExample = new URL("https://quotes.toscrape.com");
    const regexp = new RegExp("https://quotes.toscrape.com");
    console.log(`Manual crawling ${urlExample} starting...`);

    const crawler = new Crawler();
    const result = await crawler.StartCrawling(urlExample, regexp, ProgressHandler);
    WriteToFile(result);
}

// exampe of function with actual state crawler
function ProgressHandler(progress: CrawlerProgressCallback): void{
    console.log("Progress handled");
}

function WriteToFile(list: crowlingWebPage[]){
    writeFileSync("result.json",JSON.stringify(list));
}


// Run();
ManualCrawl();