/**
 * @swagger
 * /api/record:
 *   post:
 *     summary: Create a new website record
 *     description: Creates a new website record and returns the ID of the created record.
 *     requestBody:
 *       description: The website record to create.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WebsiteRecord'
 *     responses:
 *       '200':
 *         description: The ID of the created website record.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       '500':
 *         description: Failed to create record
 *     tags:
 *       - Website Records
 */

import WebsiteRecordModel from '$db/models/WebsiteRecordModel';
import type { WebsiteRecord } from '$lib/types';
import { json, error } from '@sveltejs/kit';

export async function POST({ request }) {
	const websiteRecordModel = new WebsiteRecordModel();
	const record = await request.json();
	const createdId = await websiteRecordModel.create(record as WebsiteRecord);

	if (!createdId) {
		throw error(500, 'Failed to create record');
	}

	return json(createdId);
}
