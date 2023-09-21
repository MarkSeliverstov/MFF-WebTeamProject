import WebsiteRecordModel from '$db/models/WebsiteRecordModel';
import { isError, type WebsiteRecord } from '$lib/types';
import { json, error } from '@sveltejs/kit';

export async function GET({ params }) {
	const websiteRecordModel = new WebsiteRecordModel();
	const data = await websiteRecordModel.getByID(params.id);

	if (isError(data)) {
		throw error(data.code, data.message);
	}

	return json({
		id: data.id?.toString(),
		url: data.url,
		periodicity: data.periodicity,
		regexp: data.regexp,
		label: data.label,
		active: data.active,
		tags: data.tags,
		latestGroupId: data.latestGroupId
	});
}

export async function PUT({ params, request }) {
	const websiteRecordModel = new WebsiteRecordModel();
	
	let record;
	try {
		record = await request.json();
	}
	catch (error) {
		record = null;
	}

	if (!record) {
		throw error(400, 'Invalid JSON');
	}

	const updatedRecord = await websiteRecordModel.update(params.id, record as WebsiteRecord);

	if (isError(updatedRecord)) {
		throw error(updatedRecord.code, updatedRecord.message);
	}

	return json({
		id: updatedRecord.id?.toString(),
		url: updatedRecord.url,
		periodicity: updatedRecord.periodicity,
		regexp: updatedRecord.regexp,
		label: updatedRecord.label,
		active: updatedRecord.active,
		tags: updatedRecord.tags,
		latestGroupId: updatedRecord.latestGroupId
	});
}

export async function DELETE({ params }) {
	const websiteRecordModel = new WebsiteRecordModel();
	const result = await websiteRecordModel.delete(params.id);

	if (isError(result)) {
		throw error(result.code, result.message);
	}

	return json({
		success: result
	});
}
