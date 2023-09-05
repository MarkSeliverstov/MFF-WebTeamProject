import express from "express";
import { graphqlHTTP } from "express-graphql";
import { Server } from "http";
import { schema } from "./graphqlAPI";

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
    
	return new Promise((resolve) => {
		server = app.listen(port, resolve);
		console.log(`(Server) Listening on port ${port}`);
	});
}
