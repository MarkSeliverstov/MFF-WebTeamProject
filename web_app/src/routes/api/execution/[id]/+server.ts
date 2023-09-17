/**
 * @swagger
 * /api/execution/{id}:
 *   get:
 *     summary: Get an execution by ID
 *     description: Retrieves an execution record by its unique identifier.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the execution record.
 *     responses:
 *       '200':
 *         description: The requested execution record.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Execution'
 *       '404':
 *         description: No execution with this ID found.
 *   put:
 *     summary: Update an execution by ID
 *     description: Updates an execution record by its unique identifier.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the execution record.
 *     requestBody:
 *       description: The updated execution record.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Execution'
 *     responses:
 *       '200':
 *         description: The updated execution record.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Execution'
 *       '404':
 *         description: No execution with this ID found.
 *   delete:
 *     summary: Delete an execution by ID
 *     description: Deletes an execution record by its unique identifier.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the execution record.
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
 *         description: No execution with this ID found.
 *     tags:
 *       - Executions
 */

import ExecutionModel from '$db/models/ExecutionModel';
import type { Execution } from '$lib/types';
import { json, error } from '@sveltejs/kit';

export async function GET({ params }) {
	const executionModel = new ExecutionModel();
	const execution = await executionModel.getByID(params.id);

	if (!execution) {
		throw error(404, 'No execution with this ID found');
	}

	return json({
		executionId: execution.executionId?.toString(),
		websiteRecordId: execution.websiteRecordId.toString(),
		crawlTimeStart: execution.crawlTimeStart,
		crawlTimeEnd: execution.crawlTimeEnd,
		status: execution.status,
		sitesCrawled: execution.sitesCrawled
	});
}

export async function PUT({ params, request }) {
	const executionModel = new ExecutionModel();
	const execution = await request.json();
	const updatedExecution = await executionModel.update(params.id, execution as Execution);

	if (!updatedExecution) {
		throw error(404, 'No execution with this ID found');
	}

	return json({
		executionId: execution.executionId?.toString(),
		websiteRecordId: execution.websiteRecordId.toString(),
		crawlTimeStart: execution.crawlTimeStart,
		crawlTimeEnd: execution.crawlTimeEnd,
		status: execution.status,
		sitesCrawled: execution.sitesCrawled
	});
}

export async function DELETE({ params }) {
	const executionModel = new ExecutionModel();
	const result = await executionModel.delete(params.id);

	if (!result) {
		throw error(404, 'No execution with this ID found');
	}

	return json({
		success: result
	});
}
