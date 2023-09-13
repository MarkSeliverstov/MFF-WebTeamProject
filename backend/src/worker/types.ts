import { CrowledWebPage } from "../types";

export enum Command {
    RUN,
    ABORT
}

export enum Progress {
    DONE,
    FAILED,
    PROGRESS
}

export type WorkerTask = {
    url: string,
    regex: string
}

export type WorkerCommand = {
	command: Command.RUN
	task: WorkerTask;
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