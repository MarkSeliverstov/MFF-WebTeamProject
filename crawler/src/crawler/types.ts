import { CrowledWebPage } from "../types";

export enum Command {
    RUN,
    ABORT
}

export enum State{
    BUSY,
    FREE
}

export enum Progress {
    DONE,
    FAILED,
    PROGRESS
}

export type CrawlerTask = {
    url: string,
    regex: string,
}

export type Task = {
    crawlerTask : CrawlerTask
    startCallBack: () => void
    progressCallBack: (progress: WorkerProgress) => void
    reject: (reason? : any) => void
}

export type TaskResult = {
    test: string
}

export type WorkerCommand = {
	command: Command.RUN
	task: CrawlerTask;
} | {
	command: Command.ABORT
};

export type WorkerResponse = {
    status: Progress.DONE
    result: CrowledWebPage[]
} | {
    status: Progress.FAILED,
    error: string | null
} | {
    status: Progress.PROGRESS
    progress: WorkerProgress
}

export type WorkerProgress = {
    crawled: number;
    total: number,
    webPages: CrowledWebPage[]
}
