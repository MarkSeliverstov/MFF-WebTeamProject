import { Crawler } from "./crawler/crawler";
import { runServer } from "./server";
import { CrowledWebPage } from "./types";
import { WorkerResponse, Progress } from "./worker";
import { writeFileSync } from "fs";

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
    const result = await crawler.StartCrawling(
        urlExample, 
        regexp, 
        (progress) => {
            const message: WorkerResponse = {
                status: Progress.PROGRESS,
                progress,
            };
            console.log(message.status);
        }
    );
    WriteToFile(result);
}

function WriteToFile(list: CrowledWebPage[]){
    writeFileSync("result.json",JSON.stringify(list));
}


// Run();
ManualCrawl();