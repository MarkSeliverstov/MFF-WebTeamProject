/**
 * @swagger
 * /api/records:
 *   get:
 *     summary: Get a list of website records
 *     description: Returns a list of website records from the database.
 *     responses:
 *       '200':
 *         description: A list of website records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/WebsiteRecord'
 *     tags:
 *       - Website Records
 */

import WebsiteRecordModel from '$db/models/WebsiteRecordModel';
import { json } from '@sveltejs/kit';

export async function GET() {
	const websiteRecordModel = new WebsiteRecordModel();
	const data = await websiteRecordModel.getAll();

	return json(
		data.map((record) => ({
			id: record.id?.toString(),
			url: record.url,
			periodicity: {
				unit: record.periodicity.unit,
				interval: record.periodicity.interval
			},
			regexp: record.regexp,
			label: record.label,
			active: record.active,
			tags: record.tags
		}))
	);
}
