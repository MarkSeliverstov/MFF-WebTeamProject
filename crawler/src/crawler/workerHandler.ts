import { Worker } from "worker_threads";
import { State, CrawlerTask, WorkerResponse, Progress, Command, WorkerCommand } from "./types";

export class WorkerHandler {
    private worker: Worker;
    private state: State;
    private task: CrawlerTask | null = null;
    private resolveTask!: (result: unknown) => void;
    private rejectTask!: (reaason?: any) => void;

    public GetState(): State {return this.state;}
    public GetTaskExecutionUrl(): string | null {
        if (this.task)
            return this.task.url;
        else
            return null;
    }

    constructor(){
        this.worker = new Worker("./build/crawler/crawlerWorker.js");
        this.state = State.FREE;
        this.worker.addListener("message", (message: WorkerResponse) => {
            if (this.state == State.FREE) {
                console.log(`(Worker ${this.worker.threadId}) Worker is free but sent a message`);
            }

            if (message.status === Progress.DONE){
                console.log(`(Worker ${this.worker.threadId}) Worker ends crawling`);
                this.resolveTask(message.result);
            }

            if (message.status === Progress.FAILED) {
                console.log(`(Worker ${this.worker.threadId}) Worker ends crawling with error: ${message.error}`);
                this.rejectTask(message.error);
            }

            this.state = State.FREE;
            this.task = null;
        });
    }

    public Run(task: CrawlerTask, resolve: (value: unknown) => void, reject: (reaason?: any) => void) {
        this.task = task;
        this.resolveTask = resolve;
        this.rejectTask = reject;
        const workerCmd: WorkerCommand = {
            command: Command.RUN,
            task: task,
        };
        console.log(`(Worker Handler) Posting run message to the worker ${this.worker.threadId}`);
        this.state = State.BUSY;
        this.worker.postMessage(workerCmd);
    }

    public Abort(){
        if (this.task) {
            const workerCmd: WorkerCommand = {
                command: Command.ABORT
            };
            this.worker.postMessage(workerCmd);
            this.task = null;
        }
        else {
            throw new Error(`(Worker Handler) Failed to abort crawler ${this.worker.threadId} - worker haven't task`)
        }
    }
}