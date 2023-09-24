import { CrawlerTask } from "./crawler/types";
import { WorkerQueue } from "./crawler/workersQueue";
import * as db from "./db/api";
import { 
    WebsiteRecord, 
    Execution, 
    ExecutionSatus,
    Periodicity
} from "./db/model";

// Each 5sec Interval with actualization will be start
const INTERVAL_MS = 5000;


class RecordManager{
    private workerQueue!: WorkerQueue;
    private records: WebsiteRecord[] = [];
    // recordId : Execution. Last execuion for each record
    private lastExecutions = new Map<string, Execution>();
    // private waitedExecutions = new Map<string, Execution>();
    private intervalId: NodeJS.Timer;

    private getMS: (time: Periodicity) => number = 
                        (time) => ((time.days * 24 + time.hours) * 60 + time.minutes) * 60_000;

    constructor(){
        this.intervalId = setInterval(async () => {
            for (const record of this.records){
                try{
                    if (!record.active) continue;

                    let lastRootExecution: Execution | null | undefined;
                    
                    if (this.lastExecutions.has(record.id!)){
                        lastRootExecution = this.lastExecutions.get(record.id!);
                    } else{
                        lastRootExecution = await db.getLatestRootExecutionByRecord(record);
                        if (lastRootExecution)
                            this.lastExecutions.set(record.id!, lastRootExecution);
                    }

                    if (lastRootExecution === null || lastRootExecution === undefined){
                        // Run record and create new execution
                        this.runRecord(record);
                        continue;
                    } else if (lastRootExecution.status === ExecutionSatus.QUEUED || lastRootExecution.status === ExecutionSatus.RUNNING){
                        // Skip if already queued or running
                        continue;
                    }

                    const pereodicityMS = this.getMS(record.periodicity);
                    const lastTimeMS = lastRootExecution?.crawlTimeEnd;
                    if (lastTimeMS === undefined) {
                        throw new Error(`Execution with id: ${lastRootExecution?.id} is Finished, but crawlTimeEnd is undefinded`);
                    }
                    const timeNowMS = Date.now();
                    
                    // Skip if time has not come
                    if (timeNowMS <= lastTimeMS + pereodicityMS) continue;
                    this.runRecord(record);
                } catch (error){
                    console.error(`(Crawler manager: interval error) for record: ${record.id}: ${error}`);
                }
            }
            this.workerQueue.TryRunTask();
        }, INTERVAL_MS);
    }

    public async init(crawlerCount: number){
        this.records = await db.getRecordsList();
        for (const record of this.records){
            const exe = await db.getLatestRootExecutionByRecord(record);
            if (exe) {
                this.lastExecutions.set(record.id!, exe);
            }
        }
        this.workerQueue = new WorkerQueue(crawlerCount);
    }

    public async runRecord(record: WebsiteRecord) {
        if (this.lastExecutions.has(record.id!)){
            throw new Error("Record allready have started execution, abort it or just wait");
        }

        const newCrawlerTask: CrawlerTask = {
            recordId: record.id!,
            url: record.url,
            regex: record.regexp,
        };

        this.workerQueue.Push(newCrawlerTask);
    }
    
    public async abortExecutionRecord(record: WebsiteRecord) {
        const execution = this.lastExecutions.get(record.id!);
        if (!execution){
            throw new Error(`No executions for record: ${record.id}`);
        }

        if (execution.status == (ExecutionSatus.FAILED || ExecutionSatus.SUCCESS)){
            throw new Error ("Execution for this record allready done");
        }

        await this.workerQueue.AbortTask(record.id!);
        execution.status = ExecutionSatus.FAILED;
        await db.updateExecution(execution);
    }
}


export const crawlerManager = new RecordManager();
