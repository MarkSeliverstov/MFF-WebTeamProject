import WebsiteRecordModel from '$db/models/WebsiteRecordModel';
import { json } from '@sveltejs/kit';

export async function GET() {
	const websiteRecordModel = new WebsiteRecordModel();
	const data = await websiteRecordModel.getAll();

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
