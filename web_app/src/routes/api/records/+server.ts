import WebsiteRecordModel from '$db/models/WebsiteRecordModel';
import { isError } from '$lib/types';
import { json, error } from '@sveltejs/kit';

export async function GET() {
	const websiteRecordModel = new WebsiteRecordModel();
	const data = await websiteRecordModel.getAll();
	if (isError(data)) {
		throw error(data.code, data.message);
	}
	return json(
		data.map((record) => ({
			id: record.id?.toString(),
			url: record.url,
			periodicity: record.periodicity,
			regexp: record.regexp,
			label: record.label,
			active: record.active,
			tags: record.tags,
			latestGroupId: record.latestGroupId
		}))
	);
}
