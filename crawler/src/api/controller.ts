import { Request, Response } from "express";
import { WebsiteRecord } from "../db/model";
import { getRecordByID } from "../db/api";
import { crawlerManager } from "../crawler";

export const startCrawling = async (req:Request, res: Response) => {
    const recordId: string = req.params.id;
    try{
        const record: WebsiteRecord = await getRecordByID(recordId);
        await crawlerManager.runRecord(record);
        return res.status(200).json({
            message: "Crawling started succesfully"
        });
    } catch (error) {
        console.error((`(Crawler API) Error when starting crawling record: ${recordId}, ${error}`));
        return res.status(404).json({
            message: `${error}`
        });
    }

};

export const stopCrawling = async (req:Request, res: Response) => {
    const recordId: string = req.params.id;
    try{
        const record: WebsiteRecord = await getRecordByID(recordId);
        
        await crawlerManager.abortExecutionRecord(record);
        return res.status(200).json({
            message: "Crawling was succesfully aborted"
        });
    }
    catch (error) {
        console.error((`(Crawler API) Error when aborting crawling record: ${recordId}, ${error}`));
        return res.status(404).json({
            message: `${error}`
        });
    }
};

export const pingCrawler = (req:Request, res: Response) => {
    return res.status(200).json({
        message: "Hello from crawler!"
    });
};