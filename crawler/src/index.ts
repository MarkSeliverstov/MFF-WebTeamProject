import { runServer, server } from "./api";
import { PORT, CRAWLERS_COUNT } from "./config";
import { crawlerManager } from "./crawler";
import * as dotenv from "dotenv";


async function shutdownHandler() {
	console.log("Stopping...");
    server.close(() => console.log("Crawler API server closed")).unref();
    await crawlerManager.Shutdown();
    process.exit();
}

// The entry point in the backend of crawler
async function Run(): Promise<void> {
    console.log("Backend starting...");
    process.on("SIGINT", shutdownHandler);
	process.on("SIGTERM", shutdownHandler);
    // Initilize Crawler Manager with given queue
    await crawlerManager.init(Number(CRAWLERS_COUNT));
    // Starting server for Crawler API
    await runServer(Number(PORT));

    console.log("Backend ready, luckily!");
}

// Activate .env variables
dotenv.config();
Run();