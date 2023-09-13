import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const getAll = async () => {
		const responseGetAll = await fetch('/api/records');
		const records = await responseGetAll.json();
		return records;
	};

	const create = async () => {
		// const responseCreate = await fetch('/api/record', {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json'
		// 	},
		// 	body: JSON.stringify({
		// 		url: 'https://timely-curler.org',
		// 		periodicity: { unit: 'days', interval: 8 },
		// 		regexp: 'placeat corporis ad',
		// 		label: 'Langosh, Hansen and Wolf',
		// 		active: false,
		// 		tags: ['illo', 'voluptatum', 'similique']
		// 	})
		// });
		// const createdId = await responseCreate.json();
		return null;
	};

	const update = async () => {
		// const responseUpdate = await fetch('/api/record/64fff207944e4e15d5878a0d', {
		// 	method: 'PUT',
		// 	headers: {
		// 		'Content-Type': 'application/json'
		// 	},
		// 	body: JSON.stringify({
		// 		url: 'https://youtube.com',
		// 		periodicity: { unit: 'days', interval: 7 },
		// 		regexp: 'placeat corporis ad',
		// 		label: 'Langosh, Hansen and Wolf',
		// 		active: false,
		// 		tags: ['illo', 'voluptatum', 'similique']
		// 	})
		// });
		// const updatedRecord = await responseUpdate.json();
		return null;
	};

	const deleteRecord = async () => {
		// const responseDelete = await fetch('/api/record/6500e9c889d77b62e42cd76', {
		// 	method: 'DELETE'
		// });
		// const result = await responseDelete.json();
		return null;
	};

	const getAllExecutionsByRecordId = async () => {
		const responseGetAll = await fetch('/api/executions/cabbfd419c81f2daeb13aadd');
		const executions = await responseGetAll.json();
		return executions;
	};

	const deleteAllExecutionsByRecordId = async () => {
		const responseDelete = await fetch('/api/executions/6500e9c889d77b62e42cd76', {
			method: 'DELETE'
		});
		const result = await responseDelete.json();
		return result;
	};

	return {
		websiteRecords: getAll(),
		createdId: create(),
		updatedRecord: update(),
		deleted: deleteRecord(),
		executions: getAllExecutionsByRecordId(),
		deletedExecutions: deleteAllExecutionsByRecordId()
	};
};
