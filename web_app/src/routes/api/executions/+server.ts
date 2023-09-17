/**
 * @swagger
 * /api/executions:
 *   get:
 *     summary: Get a list of executions
 *     description: Returns a list of execution records.
 *     responses:
 *       '200':
 *         description: A list of executions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Execution'
 *     tags:
 *       - Executions
 */

import ExecutionModel from '$db/models/ExecutionModel';
import { json } from '@sveltejs/kit';

export async function GET() {
	const executionModel = new ExecutionModel();
	const data = await executionModel.getAll();

	return json(
		data.map((execution) => ({
			executionId: execution.executionId?.toString(),
			websiteRecordId: execution.websiteRecordId.toString(),
			crawlTimeStart: execution.crawlTimeStart,
			crawlTimeEnd: execution.crawlTimeEnd,
			status: execution.status,
			sitesCrawled: execution.sitesCrawled
		}))
	);
}
