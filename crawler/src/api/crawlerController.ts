import { Request, Response } from "express";


export const startCrawling = async (req:Request, res: Response) => {
    const id: string = req.params.id;
    //const execution =  db.getExecution(id)
    // crawler manager - crawl

    return res.status(200).json({
        message: "Crawling started succesfully"
    });
};

export const stopCrawling = async (req:Request, res: Response) => {
    const id: string = req.params.id;
    //const execution =  db.getExecution(id)
    // crawler manager - stop

    return res.status(200).json({
        message: "Crawling stopped succesfully"
    });
};
