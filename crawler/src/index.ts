import { runServer } from "./api";
import {Port, CrawlersCount} from "./config";
import { crawlerManager } from "./crawler";
import * as dotenv from "dotenv";

// The entry point in the backend of crawler
async function Run(): Promise<void> {
    console.log("Backend starting...");

    // Initilize Crawler Manager with given queue
    crawlerManager.init(Number(CrawlersCount));
    // Starting server for Crawler API
    await runServer(Number(Port));

    console.log("Backend ready, luckily!");
}

// Activate .env variables
dotenv.config();
Run();
