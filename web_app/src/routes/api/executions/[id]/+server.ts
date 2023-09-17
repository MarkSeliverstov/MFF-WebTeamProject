/**
 * @swagger
 * /api/executions/{id}:
 *   get:
 *     summary: Get executions by Website Record ID
 *     description: Retrieves a list of executions associated with a specific Website Record by its unique identifier.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the Website Record.
 *     responses:
 *       '200':
 *         description: A list of executions associated with the Website Record.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Execution'
 *   delete:
 *     summary: Delete executions by Website Record ID
 *     description: Deletes all executions associated with a specific Website Record by its unique identifier.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the Website Record.
 *     responses:
 *       '200':
 *         description: Deletion success status.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *       '404':
 *         description: No executions with this Website Record ID found.
 *     tags:
 *       - Executions
 */

import ExecutionModel from '$db/models/ExecutionModel';
import { json, error } from '@sveltejs/kit';

export async function GET({ params }) {
	const executionModel = new ExecutionModel();
	const data = await executionModel.getAllByWebsiteRecordId(params.id);

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

export async function DELETE({ params }) {
	const executionModel = new ExecutionModel();
	const result = await executionModel.deleteAllByWebsiteRecordId(params.id);

	if (!result) {
		throw error(404, 'No executions with this Website Record ID found');
	}

	return json({
		success: result
	});
}
