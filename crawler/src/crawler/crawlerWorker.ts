import { Crawler } from "./crawler";
import { CrowledWebPage } from "../types";
import { 
    Command, 
    Progress, 
    WorkerCommand, 
    WorkerResponse, 
    CrawlerTask 
} from "./types";
import { isMainThread, parentPort } from "worker_threads";



/** The main entry point for each crawler worker */
async function RunTask(task: CrawlerTask): Promise<number> {
    currentCrawler = new Crawler();
    const result = await currentCrawler.StartCrawling(task);
    return result;
}


// Managment of each worker
console.log(`Init Crawler Worker [${process.ppid}]`);
let currentCrawler: Crawler | null;


parentPort?.on("message", (msg: WorkerCommand) => {
    if (msg.command === Command.RUN) {
        console.log(`(crawler ${process.pid}) Started crawling`);
        RunTask(msg.task)
        .then((result) => {
            console.log(`[crawler ${process.pid}] Running finished`);
            const response: WorkerResponse = {
                status: Progress.DONE,
                result: result
            };
            parentPort?.postMessage(response);
        })
        .catch((error) => {
            console.log(`[crawler ${process.pid}] Running failed:`, error);
            const response: WorkerResponse = {
                status: Progress.FAILED,
                error: String(error),
            };
            parentPort?.postMessage(response);
        })
        .finally(() => currentCrawler = null);
    }
    else if (msg.command === Command.ABORT) {
        console.log(`(crawler ${process.pid}) Aborting...`);
        currentCrawler?.abort();
        currentCrawler = null;
    }
});