import { Crawler } from "./crawler/crawler.js";
import { StartServer } from "./server.js";
import { crowlingWebPage, CrawlerProgressCallback } from "./helpers/types.js";
import { readFileSync, writeFileSync } from "fs";

const urlExample = new URL("https://quotes.toscrape.com");

async function Start(): Promise<void> {
    console.log("Backend starting...");
    // init db

    // Server for api
    await StartServer(5001);
    const crawler = new Crawler();
    const regexp = new RegExp("https://quotes.toscrape.com");
    
    console.log("Backend ready");
    
    // start crawler
    const result = await crawler.StartCrawling(urlExample, regexp, ProgressHandler);
    WriteToFile(result);
}

function WriteToFile(list: crowlingWebPage[]){
    writeFileSync("result.json",JSON.stringify(list));
}

// exampe of function with actual state crawler
function ProgressHandler(progress: CrawlerProgressCallback): void{
    console.log("Progress handled");
}

Start();