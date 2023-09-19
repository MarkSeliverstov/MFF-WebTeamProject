import WebsiteRecordModel from '$db/models/WebsiteRecordModel';
import type { WebsiteRecord } from '$lib/types';
import { json, error } from '@sveltejs/kit';

export async function POST({ request }) {
	const websiteRecordModel = new WebsiteRecordModel();
	const record = await request.json();
	const createdId = await websiteRecordModel.create(record as WebsiteRecord);

	if (!createdId) {
		throw error(500, 'Failed to create record');
	}

	return json(createdId);
}
