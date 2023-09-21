import ExecutionModel from '$db/models/ExecutionModel';
import  { type Execution, type Error, isError } from '$lib/types.js';
import { json, error } from '@sveltejs/kit';

export async function GET({ url }) {
	const executionModel = new ExecutionModel();

	const ownerId = url.searchParams.get('ownerId') ?? null;
	const groupId = url.searchParams.get('groupId') ?? null;

	let data: Execution[] | Error;

	if(ownerId && groupId) {
		const convertedGroupId = Number(groupId);

		if(isNaN(convertedGroupId)) {
			throw error(400, 'groupId must be a number');
		}

		data = await executionModel.getAllByOwnerIdAndGroupId(ownerId, convertedGroupId);
	} else {
		data = await executionModel.getAll();
	}

	if (isError(data)) {
		throw error(data.code, data.message);
	}

	return json(
		data.map((execution) => ({
			id: execution.id?.toString(),
			ownerId: execution.ownerId.toString(),
			groupId: execution.groupId,
			root: execution.root,
			url: execution.url,
			crawlTimeStart: execution.crawlTimeStart,
			crawlTimeEnd: execution.crawlTimeEnd,
			status: execution.status,
			sitesCrawled: execution.sitesCrawled,
			links: execution.links,
			title: execution.title
		}))
	);
}
