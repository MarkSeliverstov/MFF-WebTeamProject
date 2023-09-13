import WebsiteRecordModel from '$db/models/WebsiteRecordModel';
import type { WebsiteRecord } from '$lib/types';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	const websiteRecordModel = new WebsiteRecordModel();
    const record  = await request.json();
	const createdId = await websiteRecordModel.create(record as WebsiteRecord);

	return json(createdId);
}
