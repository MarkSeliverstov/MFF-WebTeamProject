import { resolve } from "path";
import { CrawlerTask, State } from "./types";
import { WorkerHandler } from "./workerHandler";


export class WorkerQueue{
    private workers: WorkerHandler[] = [];
    private taskQueue: CrawlerTask[] = [];

    constructor(workersCount: number){
        for (let i = 0; i < workersCount; i++) {
            this.workers.push(new WorkerHandler());
        }
    }

    /** Push task to the Worker Queue as Promise */
    public Push(task: CrawlerTask) {
        this.taskQueue.push(task);
        this.TryRunTask();
    }

    /** Remove task from queue if exists */
    public Remove(task: CrawlerTask) {
        if (this.taskQueue.includes(task)){
            this.taskQueue.splice(this.taskQueue.indexOf(task), 1);
        }
    }

    /** Try to run task if exists task and free worker */
    public TryRunTask(){
        console.log("(Worker queue) Try to run next task");
        const freeWorker = this.workers.find((w: WorkerHandler) => w.GetState() == State.FREE);
        if (freeWorker !== undefined){
            const task = this.taskQueue.shift();
            
            if (task !== undefined){
                console.log(`(Worker queue) Starting new task with url: ${task.url}`);
                const taskPromise = new Promise((resolve, reject) => {
                    freeWorker.Run(task, resolve, reject);
                });
                
                taskPromise
                    .then((result) => console.log(`(Worker queue) Task with url: ${task.url} was done, crawled ${result} pages`))
                    .catch((error) => console.warn(`(Worker queue) Task with url: ${task.url} was failed becouse of error: ${error}`))
                    .finally(() => this.TryRunTask());
                return;
            }
            console.log("(Worker queue) Queue of tasks is empty");
            return;
        }
        console.log("(Worker queue) All workers are busy");
    }

    public async AbortTask(recordId: string){
        console.log(`(Worker queue) Aborting execution for record id: ${recordId}`);
        const task = this.taskQueue.find((t) => t.recordId === recordId);
        if (task){
            this.Remove(task);
        } else {
            const worker = this.workers.find((w) => w.GetTaskExecutionUrl() === recordId);
            if (worker) worker.Abort();
        }
        console.log(`(Worker queue) Record execution with record id: ${recordId} was aborted`);
    }
}
