/**
 * @swagger
 * /api/execution:
 *   post:
 *     summary: Create a new execution record
 *     description: Creates a new execution record and returns the ID of the created record.
 *     requestBody:
 *       description: The execution record to create.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Execution'
 *     responses:
 *       '200':
 *         description: The ID of the created execution record.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       '500':
 *         description: Failed to create record
 *     tags:
 *       - Executions
 */

import ExecutionModel from '$db/models/ExecutionModel';
import type { Execution } from '$lib/types';
import { json, error } from '@sveltejs/kit';

export async function POST({ request }) {
	const executionModel = new ExecutionModel();
	const execution = await request.json();
	const createdId = await executionModel.create(execution as Execution);

	if (!createdId) {
		throw error(500, 'Failed to create record');
	}

	return json(createdId);
}
