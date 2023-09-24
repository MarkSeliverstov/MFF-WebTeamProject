import { Execution } from "../db";

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
    recordId: string,
    url: string,
    regex: string,
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
    result: number
} | {
    status: Progress.FAILED,
    error: string | null
}
