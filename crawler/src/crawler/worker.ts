import { Crawler } from "./crawler";
import { CrowledWebPage } from "../types";
import { 
    Command, 
    Progress, 
    WorkerCommand, 
    WorkerProgress, 
    WorkerResponse, 
    CrawlerTask 
} from "./types";

/** The main entry point for each crawler worker */
async function RunTask(
    task: CrawlerTask, 
    progressCallback: (progress: WorkerProgress) => void
): Promise<CrowledWebPage[]> {
	const crawler = new Crawler();
	currentCrawlers.add(crawler);
	try {
		const result = await crawler.StartCrawling(
            new URL(task.url), new RegExp(task.regex, "ui"), progressCallback
        );
        return result;
	} finally {
		currentCrawlers.delete(crawler);
	}
}

const currentCrawlers = new Set<Crawler>();

// Managment of each worker
console.log(`Init Crawler Worker [${process.pid}]`);
process.on("message", (msg: WorkerCommand) => {
    if (msg.command === Command.RUN) {
        console.log(`(crawler ${process.pid}) Started crawling`);
        RunTask(msg.task, (progress) => {
            const message: WorkerResponse = {
                status: Progress.PROGRESS,
                progress,
            };
            process.send?.(message);
        })
        .then((result) => {
            console.log(`[crawler ${process.pid}] Running finished`);
            const response: WorkerResponse = {
                status: Progress.DONE,
                result,
            };
            process.send?.(response);
        })
        .catch((error) => {
            console.log(`[crawler ${process.pid}] Running failed:`, error);
            const response: WorkerResponse = {
                status: Progress.FAILED,
                error: String(error),
            };
            process.send?.(response);
        });
    }
    else if (msg.command === Command.ABORT) {
        console.log(`(crawler ${process.pid}) Aborting...`);
		currentCrawlers.forEach(c => c.abort());
    }
});