import type { WebsiteRecord, Execution } from '$lib/types';

interface Node {
	title?: string;
	url: string;
	crawlTime?: string;
	links: Node[];
	owner: object;
}

const resolvers = {
	Query: {
		websites: async () => {
			try {
				const response = await fetch('http://localhost:5173/api/records');
				const records = await response.json();
				return records.map((record: WebsiteRecord) => {
					return {
						identifier: record.id,
						label: record.label,
						url: record.url,
						regexp: record.regexp,
						tags: record.tags,
						active: record.active
					};
				});
			} catch (error) {
				console.error(error);
				throw error;
			}
		},
		nodes: async (_: undefined, args: { webPages: string[] | number[] }) => {
			const nodes: Node[] = [];
			if (args.webPages.length === 0) return nodes;
			const convertedIDs: string[] = [];
			if (Array.isArray(args.webPages)) {
				args.webPages.forEach((id) => {
					if (typeof id === 'number') {
						// Convert numbers to strings
						convertedIDs.push(id.toString());
					} else if (typeof id === 'string') {
						// Handle strings if needed
						convertedIDs.push(id);
					}
				});
			}

			try {
				for (const id of convertedIDs) {
					const record_response = await fetch(`http://localhost:5173/api/record/${id}`);
					const record = await record_response.json();
                    // throw new Error(JSON.stringify(record, null, 2));
					if (record) {
                        const owner = {
                            identifier: record.id,
                            label: record.label,
                            url: record.url,
                            regexp: record.regexp,
                            tags: record.tags,
                            active: record.active
                        }

						const id = record.id;
						const group = record.latestGroupId;
						const group_response = await fetch(
							`http://localhost:5173/api/executions?ownerId=${id}&groupId=${group}`
						);
						const group_data = await group_response.json();
						if (Array.isArray(group_data)) {
                            const group_executions: Execution[] = group_data;
							const root_execution: Execution | undefined = group_executions.find(
								(execution: Execution) => execution.root === true
							);

							if (!root_execution) {
								throw new Error('No root execution found');
							}

							const links_to_nodes = (root_execution: Execution): Node[] => {
								const nodes = [];
								for (const link of root_execution.links) {
									const next_execution: Execution | undefined = group_executions.find(
										(execution: Execution) => execution.url === link
									);

									if (!next_execution) {
										throw new Error('No next execution found');
									}
									nodes.push({
										title: next_execution.title,
										url: next_execution.url,
										crawlTime: (
											next_execution.crawlTimeEnd - next_execution.crawlTimeStart
										).toString(),
										owner: owner,
										links: links_to_nodes(next_execution)
									});
								}
								return nodes;
							};

							nodes.push({
								title: root_execution.title,
								url: root_execution.url,
								crawlTime: (root_execution.crawlTimeEnd - root_execution.crawlTimeStart).toString(),
								owner: owner,
								links: links_to_nodes(root_execution)
							});
						}
					}
				}
				return nodes;
			} catch (error) {
				console.error(error);
				throw error;
			}
		}
	}
};

export default resolvers;
