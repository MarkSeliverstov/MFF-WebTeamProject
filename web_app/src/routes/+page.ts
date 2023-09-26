import type { PageLoad } from './api/$types';

export const load: PageLoad = async ({ fetch }) => {
	const getAll = async () => {
		const responseGetAll = await fetch('/api/records');
		const records = await responseGetAll.json();
		return records;
	};

    return {
		websiteRecords: getAll()		
	};
};