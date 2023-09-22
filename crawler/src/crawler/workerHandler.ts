import { Worker } from "worker_threads";
import { State, CrawlerTask, WorkerResponse, Progress } from "./types";

export class WorkerHandler {
    private worker: Worker;
    private state: State;
    private task: CrawlerTask | null = null;

    public GetState(): State {return this.state;}

    constructor(){
        this.worker = new Worker("./crawlerWorker.ts");
        this.state = State.FREE;
        this.worker.addListener("message", (message: WorkerResponse) => {
            if (this.state == State.FREE) {
                throw new Error("Worker is free but sent a message");
            }
            if (message.status == Progress.PROGRESS){
                return;
            }

            this.state = State.FREE;
            this.task = null;

        });
    }
}