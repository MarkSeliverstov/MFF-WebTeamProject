import { startDatabase } from '$db/database';
import type { Handle } from '@sveltejs/kit';

try {
	await startDatabase();
	console.log('Started database');
} catch (err) {
	console.error('Error starting the database:', err);
}

export const handle: Handle = async ({ resolve, event }) => {
	// Apply CORS header for API routes
	if (event.url.pathname.startsWith('/api')) {
		// Required for CORS to work
		if (event.request.method === 'OPTIONS') {
			return new Response(null, {
				headers: {
					'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Headers': '*'
				}
			});
		}
	}

	const response = await resolve(event);
	if (event.url.pathname.startsWith('/api')) {
		response.headers.append('Access-Control-Allow-Origin', `*`);
	}
	return response;
};
