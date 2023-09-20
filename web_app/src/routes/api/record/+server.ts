import WebsiteRecordModel from '$db/models/WebsiteRecordModel';
import { type WebsiteRecord, isError } from '$lib/types';
import { json, error } from '@sveltejs/kit';

export async function POST({ request }) {
	const websiteRecordModel = new WebsiteRecordModel();
	const record = await request.json();
	const createdId = await websiteRecordModel.create(record as WebsiteRecord);

	if (isError(createdId)) {
		throw error(createdId.code, createdId.message);
	}

	return json(createdId);
}
