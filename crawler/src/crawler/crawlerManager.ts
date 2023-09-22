import { WebsiteRecord, Execution, getRootExecutions, getRecordByID, ExecutionSatus, getExecutionsByOwnerIDAndGroupID } from "../db";
import { WorkerQueue } from "./workersQueue";
import { getRecords } from "../db";
import { Periodicity } from '../db/model';

const INTERVAL_MS = 5000;

class CrawlerManager{
    private workerQueue!: WorkerQueue;
    private records: WebsiteRecord[] = [];
    private executions: Execution[] = [];
    // private lastExecutions = new Map<string, Execution>();
    // private waitedExecutions = new Map<string, Execution>();
    private updater: NodeJS.Timer;

    private getMS: (time: Periodicity) => number = 
                        (time) => ((time.days * 24 + time.hours) * 60 + time.minutes) * 60_000;

    constructor(){
        this.updater = setInterval(async () => {
            for (const record of this.records){
                try{
                    const last_executions = await getExecutionsByOwnerIDAndGroupID(record.id, record.latestGroupId)
                    // Creating nw root execution if dousnt exists yet
                    if (last_executions.length == 0){
                        //create and start execution ann add to last exe
                        continue;
                    }
                    
                    // Skip if running
                    const last_execution = last_executions[-1];
                    if (last_execution.status == ExecutionSatus.QUEUED || ExecutionSatus.RUNNING){
                        continue;
                    }

                    const pereodicityMS = this.getMS(record.periodicity);
                    const lastTimeMS = last_execution.crawlTimeEnd;
                    const timeNowMS = Date.now();
                    if (timeNowMS <= lastTimeMS + pereodicityMS) continue;
                    // Start if time has come
                    crawlerManager.runRecord(record);
                }
                catch {

                }
            }
        }, INTERVAL_MS);
    }

    public async init(crawlerCount: number){
        this.records = await getRecords();
        this.executions = await getRootExecutions();
        this.workerQueue = new WorkerQueue(crawlerCount);
    }

    public runRecord(record: WebsiteRecord) {
        throw new Error("Method not implemented.");
    }
    
    public abortExecution(execution: Execution) {
        throw new Error("Method not implemented.");
    }
}


export const crawlerManager = new CrawlerManager();