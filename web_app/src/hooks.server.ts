import { startDatabase } from "$db/database";

try {
	await startDatabase();
	console.log('Started database');
} catch (err) {
	console.error('Error starting the database:', err);
}
