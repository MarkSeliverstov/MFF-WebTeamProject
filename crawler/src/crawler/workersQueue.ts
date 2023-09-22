import { CrawlerTask, State, Task, TaskResult, WorkerProgress } from "./types";
import { WorkerHandler } from "./crawlerWorkerHandler";


export class WorkerQueue{
    private workers: WorkerHandler[] = [];
    private taskQueue: Task[] = [];

    constructor(workersCount: number){
        for (let i = 0; i < workersCount; i++) {
            this.workers.push(new WorkerHandler());
        }
    }

    /** Push task to the Worker Queue as Promise */
    public Push(
        task: CrawlerTask, 
        startCallback: () => void, 
        progressHandler: (progress: WorkerProgress) => void
    ): Promise<TaskResult> {
        return new Promise((resolve, reject) => {
            const CrawlerTask: Task = {
                crawlerTask: task,
                startCallBack: startCallback,
                progressCallBack: progressHandler,
                reject: reject
            };

            this.taskQueue.push(CrawlerTask);

            let freeWorker: WorkerHandler | undefined = undefined;
            while(freeWorker === undefined){
                freeWorker = this.workers.find((w: WorkerHandler) => w.GetState() == State.FREE);
                const task = this.taskQueue.shift();
                if (task !== undefined){
                    task.startCallBack();
                    freeWorker.Run(task.crawlerTask, task.progressCallBack)
                    .then((result) => {this.TryRunTask();})
                }
            }
        });
    }

    public TryRunTask(): void {
        let freeWorker: WorkerHandler | undefined = undefined;
        while(freeWorker === undefined){
            freeWorker = this.workers.find((w: WorkerHandler) => w.GetState() == State.FREE);
            const task = this.taskQueue.shift();
            if (task !== undefined){
                task.startCallBack();
                freeWorker.Run(task.crawlerTask, task.progressCallBack)
                .then((result) => {this.TryRunTask();})
            }
        }
    }
}
