import express from "express";
import { Server } from "http";
import { router } from ".";

export let server: Server;

export function runServer(port: number): Promise<void> {
	const app = express();
	app.use(express.json());
	
	// Setting up REST api routes
	app.use("/api", router);
	// Error handling
	app.use((req, res) => {
		return res.status(404).json({
			message: "Api not found"
		});
	});

	return new Promise((resolve) => {
		server = app.listen(port, resolve);
		console.log(`(Server) Listening on port ${port}`);
	});
}