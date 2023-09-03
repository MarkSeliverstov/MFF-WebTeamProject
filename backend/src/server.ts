import express from "express";
import { Server } from "http";

let HttpServer: Server;

export function StartServer(port: number): Promise<void> {
	const app = express();

	// Start listening
	return new Promise((resolve) => {
        HttpServer = app.listen(port, () => {
            console.log(`[Http] Server listening on port ${port}`);
            resolve();
        });
    });
}
