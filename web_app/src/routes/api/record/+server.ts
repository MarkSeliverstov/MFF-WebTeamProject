import WebsiteRecordModel from '$db/models/WebsiteRecordModel';
import { type WebsiteRecord, isError } from '$lib/types';
import { json, error } from '@sveltejs/kit';

export async function POST({ request }) {
	const websiteRecordModel = new WebsiteRecordModel();
	let record;
	try {
		record = await request.json();
	} catch (error) {
		record = null;
	}

	if (!record) {
		throw error(400, 'Invalid JSON');
	}
	const createdId = await websiteRecordModel.create(record as WebsiteRecord);

	if (isError(createdId)) {
		throw error(createdId.code, createdId.message);
	}

	return json(createdId);
}
