import { Request, Response } from "express";
import { getRecordByID, WebsiteRecord, getExecutionsByOwnerIDAndGroupID } from "../db";
import { crawlerManager } from "../crawler";

export const startCrawling = async (req:Request, res: Response) => {
    const recordId: string = req.params.id;
    const record: WebsiteRecord | null = await getRecordByID(recordId);
    if (record === null){
        return res.status(404).json({
            message: `Record with id: ${recordId} not found!`
        });
    }

    crawlerManager.runRecord(record);
    return res.status(200).json({
        message: "Crawling started succesfully"
    });
};

export const stopCrawling = async (req:Request, res: Response) => {
    const recordId: string = req.params.id;
    const record: WebsiteRecord | null = await getRecordByID(recordId);
    if (record === null){
        return res.status(404).json({
            message: `Record with id: ${recordId} not found!`
        });
    }

    const execution = await getExecutionsByOwnerIDAndGroupID(record.id, record.latestGroupId);
    if (execution === null) {
        return res.status(404).json({
            message: `Execution with ownerId: ${record.id} a groupId: ${record.latestGroupId} not found!`
        });
    }
    
    crawlerManager.abortExecution(execution);
    return res.status(200).json({
        message: "Crawling was succesfully aborted"
    });
};
