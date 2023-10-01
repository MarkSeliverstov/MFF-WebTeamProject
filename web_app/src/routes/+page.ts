import type { Execution, WebsiteRecord } from '$src/lib/types';
import { allExecutionsStore, allRecordsStore, lastExecutionsMapStore} from '$lib/graphDataStore';
import type { PageLoad } from './api/$types';

export const load: PageLoad = async ({ fetch }) => {
	const getAllRootExecutions = async (): Promise<Execution[]> => {
		const response = await fetch('/api/executions');
		const executions = await response.json();

		return executions as Execution[];
	}
	const executions = await getAllRootExecutions();

	const getRecordsWithLastExecutions = async (): Promise<{ records: WebsiteRecord[], lastExecutionsMap: Map<string, Execution[]> }> => {
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
			} catch(error) {
				console.log("Error while fetching last execution for record: " + error);
				record.lastExecution = null;
			}
			record.selected = false;
		}
		lastExecutionsMapStore.set(lastExecutionsMap);
		allRecordsStore.set(records);
		return  { records, lastExecutionsMap };
	}

	const getAllExecutions = async (): Promise<Execution[]> => {
		const response = await fetch('api/executionsAll');
		const executions = await response.json();
		return executions as Execution[];
	}

	allExecutionsStore.set(await getAllExecutions());

	const { records, lastExecutionsMap } = await getRecordsWithLastExecutions();

	// app-wide execution&records storage - accessed by node detail component

    return {
		websiteRecords: records, lastExecutionsMap: lastExecutionsMap, executions: executions, 	
	};
};
