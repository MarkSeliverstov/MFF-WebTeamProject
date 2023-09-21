import express from "express";
import { graphqlHTTP } from "express-graphql";
import { Server } from "http";
import { schema } from "./graphqlAPI";
import { router } from "./api";

export let server: Server;

export function runServer(port: number): Promise<void> {
	const app = express();

	app.use(
		"/graphql",
		graphqlHTTP({
			schema: schema,
            graphiql: true
		}),
	);

	app.use(express.json());

	/** Setting up REST api */
	app.use("/api", router);

	/** Error handling */
	app.use((req, res) => {
		return res.status(404).json({
			message: "not found"
		});
	});

	return new Promise((resolve) => {
		server = app.listen(port, resolve);
		console.log(`(Server) Listening on port ${port}`);
	});
}