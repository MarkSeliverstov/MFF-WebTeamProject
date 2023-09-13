import WebsiteRecordModel from '$db/models/WebsiteRecordModel';
import { json } from '@sveltejs/kit';

export async function GET() {
	const websiteRecordModel = new WebsiteRecordModel();
	const data = await websiteRecordModel.getAll();

	return json(
		data.map((record) => ({
			id: record.id?.toString(),
			url: record.url,
			periodicity: {
				unit: record.periodicity.unit,
				interval: record.periodicity.interval
			},
			regexp: record.regexp,
			label: record.label,
			active: record.active,
			tags: record.tags
		}))
	);
}
