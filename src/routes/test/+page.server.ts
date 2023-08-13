import WebsiteRecordModel from '$db/models/WebsiteRecordModel';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const websiteRecordModel = new WebsiteRecordModel();
	const data = await websiteRecordModel.getAll();

	return {
        websiteRecords: data.map(record => ({
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
	};
};
