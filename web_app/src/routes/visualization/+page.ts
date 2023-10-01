// TODO: implement getting a node json for selected crawled website record
export const ssr = false;

import type { PageLoad } from './$types';
import type { Execution } from '$lib/types';

export const load: PageLoad = async ({ url, fetch }) => {
    const ids = url.searchParams.get('ids');
    if (!ids) {
        throw new Error('ids is required');
    }
    const idsArray = ids.split(',');
    let nodes: Execution[] = [];
    try {
        for(const id of idsArray) {
            const record_response = await fetch(`/api/record/${encodeURIComponent(id)}`);
            const record = await record_response.json();
            const executions_response = await fetch(`/api/executions?ownerId=${encodeURIComponent(record.id)}&groupId=${encodeURIComponent(record.latestGroupId)}`);
            const group_executions = await executions_response.json();
            nodes = [...nodes, ...group_executions];
        }
    } catch (e) {
        throw new Error('Failed to load data from database');
    }

    return {
        nodes: nodes
    };
}