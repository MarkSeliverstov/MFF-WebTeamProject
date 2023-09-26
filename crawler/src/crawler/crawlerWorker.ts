import { Crawler } from "./crawler";
import { 
    Command, 
    Progress, 
    WorkerCommand, 
    WorkerResponse, 
    CrawlerTask 
} from "./types";
import { parentPort, threadId } from "worker_threads";



/** The main entry point for each crawler worker */
async function RunTask(task: CrawlerTask): Promise<number> {
    currentCrawler = new Crawler();
    const result = await currentCrawler.StartCrawling(task);
    return result;
}


// Managment of each worker
console.log(`(Worker ${threadId}) Init Crawler Worker`);
let currentCrawler: Crawler | null;


parentPort?.on("message", (msg: WorkerCommand) => {
    if (msg.command === Command.RUN) {
        // console.log(`(Crawler Worker ${threadId}) Started crawling`);
        RunTask(msg.task)
        .then((result) => {
            console.log(`(crawler ${threadId}) Running finished`);
            const response: WorkerResponse = {
                status: Progress.DONE,
                result: result
            };
            parentPort?.postMessage(response);
        })
        .catch((error) => {
            console.log(`(crawler ${threadId}) Running failed:`, error);
            const response: WorkerResponse = {
                status: Progress.FAILED,
                error: String(error),
            };
            parentPort?.postMessage(response);
        })
        .finally(() => currentCrawler = null);
    }
    else if (msg.command === Command.ABORT) {
        console.log(`(Worker ${threadId}) Aborting...`);
        currentCrawler?.abort();
        currentCrawler = null;
    }
});