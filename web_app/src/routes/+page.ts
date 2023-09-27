import type { Execution } from '$src/lib/types';
import type { PageLoad } from './api/$types';

export const load: PageLoad = async ({ fetch }) => {
	const getAllExecutions = async (): Promise<Execution[]> => {
		const response = await fetch('/api/executions');
		const executions = await response.json();
		return executions as Execution[];
	}
	const executions = await getAllExecutions();

	const getRecordsWithLastExecutions = async () => {
		const responseGetAll = await fetch('/api/records');
		const records = await responseGetAll.json();
		const lastExecutionsMap = new Map<string, Execution[]>();
		for(const record of records) {
			try {
				const request = await fetch(`/api/executions?ownerId=${record.id}&groupId=${record.latestGroupId}`);
				const lastExecutions = await request.json();
				lastExecutionsMap.set(record.id, lastExecutions);
				const lastExecution = lastExecutions.find((execution: Execution) => execution.root);
				record.lastExecution = lastExecution;
				//console.log(record);
			} catch(error) {
				console.log("Error while fetching last execution for record: " + error);
				record.lastExecution = null;
			}
			record.selected = false;
		}
		return  { records, lastExecutionsMap };
	}

	const { records, lastExecutionsMap } = await getRecordsWithLastExecutions();

    return {
		websiteRecords: records, lastExecutionsMap: lastExecutionsMap, executions: executions, 	
	};
};