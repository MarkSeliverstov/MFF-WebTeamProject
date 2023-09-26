import { CrawlerTask, State } from "./crawler/types";
import { WorkerQueue } from "./crawler/workersQueue";
import * as db from "./db/api";
import { 
    WebsiteRecord, 
    Execution, 
    ExecutionStatus,
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
    private intervalId!: NodeJS.Timer;

    private getMS: (time: Periodicity) => number = 
                        (time) => ((time.days * 24 + time.hours) * 60 + time.minutes) * 60_000;


    private async updateRecords() {
        this.records = await db.getRecordsList();
    }

    private async updateExecutions() {
        for (const record of this.records){
            const exe = await db.getLatestRootExecutionByRecord(record);
            if (exe) {
                this.lastExecutions.set(record.id!, exe);
            }
        }
    }

    public async init(crawlerCount: number){
        await this.updateRecords();
        await this.updateExecutions();
        for (const [_, execution] of this.lastExecutions.entries()){
            if (execution.status === ExecutionStatus.QUEUED || execution.status === ExecutionStatus.RUNNING){
                execution.status = ExecutionStatus.FAILED;
                execution.crawlTimeEnd = Date.now();
                await db.updateExecution(execution);
            }
        }
        this.workerQueue = new WorkerQueue(crawlerCount);
        this.intervalId = setInterval(async () => {
            await this.updateRecords();
            await this.updateExecutions();
            for (const record of this.records){
                try{
                    if (!record.active) continue;

                    let lastRootExecution: Execution | null | undefined;
                    
                    if (this.lastExecutions.has(record.id!)){
                        lastRootExecution = this.lastExecutions.get(record.id!);
                    }

                    if (lastRootExecution === null || lastRootExecution === undefined){
                        // Run record and create new execution
                        console.log(`Last execution not find, run record: ${record.id}`);
                        await this.runRecord(record);
                        continue;
                    } else if (lastRootExecution.status === ExecutionStatus.QUEUED || lastRootExecution.status === ExecutionStatus.RUNNING){
                        // Skip if already queued or running
                        continue;
                    }

                    if (this.workerQueue.existTask(record.id!)){
                        continue;
                    }

                    const pereodicityMS = this.getMS(record.periodicity);
                    const lastTimeMS = lastRootExecution.crawlTimeEnd;
                    const timeNowMS = Date.now();
                    
                    // Skip if time has not come
                    if (timeNowMS >= lastTimeMS + pereodicityMS) continue;
                    await this.runRecord(record);
                } catch (error){
                    continue;
                }
            }
            this.workerQueue.TryRunTask();
        }, INTERVAL_MS);
    }

    public async runRecord(record: WebsiteRecord) {
        if (!this.records.includes(record)){
            this.records.push(record);
        }
        await this.updateExecutions();
        const lastExe = this.lastExecutions.get(record.id!)
        if (lastExe && (lastExe.status === ExecutionStatus.QUEUED || lastExe.status === ExecutionStatus.RUNNING)){
            throw new Error(`Execution for record ${record.id} already running`);
        }
        if (this.workerQueue.existTask(record.id!)){
            throw new Error(`Execution for record ${record.id} already queued`);
        }

        const newCrawlerTask: CrawlerTask = {
            recordId: record.id!,
            url: record.url,
            regex: record.regexp,
        };

        this.workerQueue.Push(newCrawlerTask);
    }
    
    public async abortExecutionRecord(record: WebsiteRecord) {
        await this.updateExecutions();
        const execution = this.lastExecutions.get(record.id!);
        if (!execution){
            throw new Error(`No executions for record: ${record.id}`);
        }

        if (execution.status == ExecutionStatus.FAILED || execution.status == ExecutionStatus.SUCCESS){
            throw new Error ("Execution for this record allready done");
        }

        await this.workerQueue.AbortTask(record.id!);
        execution.status = ExecutionStatus.FAILED;
        await db.updateExecution(execution);
    }

    public async Shutdown() {
        await this.workerQueue.AbortAllTasks();
    }
}


export const crawlerManager = new RecordManager();
