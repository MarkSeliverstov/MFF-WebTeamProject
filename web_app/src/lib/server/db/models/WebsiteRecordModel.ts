import { Model, type WebsiteRecord, type Error } from '$lib/types';
import { type Collection, ObjectId } from 'mongodb';
import db from '$db/database';

export default class WebsiteRecordModel extends Model<WebsiteRecord> {
	collection: Collection = db.collection('webpage_records');
	async create(websiteRecord: WebsiteRecord): Promise<ObjectId | Error> {
		try {
			const result = await this.collection.insertOne(websiteRecord);
			return result.insertedId;
		} catch (error) {
			return {
				code: 500,
				message: 'Failed to create website record'
			} as Error;
		}
	}
	async getByID(id: string): Promise<WebsiteRecord | Error> {
		try {
			if (!ObjectId.isValid(id)) {
				return {
					code: 400,
					message: 'Invalid Mongo ID'
				} as Error;
			}

			const result = await this.collection.findOne({ _id: new ObjectId(id) });

			if (result) {
				return {
					id: result._id,
					url: result.url,
					periodicity: result.periodicity,
					regexp: result.regexp,
					label: result.label,
					active: result.active,
					tags: result.tags,
					latestGroupId: result.latestGroupId
				} as WebsiteRecord;
			}

			return {
				code: 404,
				message: 'Website record not found'
			} as Error;
		} catch (error) {
			return {
				code: 500,
				message: 'Failed to get website record'
			} as Error;
		}
	}
	async update(id: string, updatedItem: WebsiteRecord): Promise<WebsiteRecord | Error> {
		try {
			if (!ObjectId.isValid(id)) {
				return {
					code: 400,
					message: 'Invalid Mongo ID'
				} as Error;
			}

			const result = await this.collection.updateOne(
				{ _id: new ObjectId(id) },
				{ $set: updatedItem }
			);

			if (result.modifiedCount > 0) {
				return updatedItem;
			}
			return {
				code: 404,
				message: 'Website record not found'
			} as Error;
		} catch (error) {
			return {
				code: 500,
				message: 'Failed to update website record'
			} as Error;
		}
	}
	async delete(id: string): Promise<boolean | Error> {
		try {
			if (!ObjectId.isValid(id)) {
				return {
					code: 400,
					message: 'Invalid Mongo ID'
				} as Error;
			}

			const result = await this.collection.deleteOne({ _id: new ObjectId(id) });
			if (result.deletedCount > 0) {
				return true;
			}
			return {
				code: 404,
				message: 'Website record not found'
			} as Error;
		} catch (error) {
			return {
				code: 500,
				message: 'Failed to delete website record'
			} as Error;
		}
	}
	async getAll(): Promise<WebsiteRecord[] | Error> {
		try {
			const result = await this.collection.find().toArray();
			return result.map(
				(item) =>
					({
						id: item._id,
						url: item.url,
						periodicity: item.periodicity,
						regexp: item.regexp,
						label: item.label,
						active: item.active,
						tags: item.tags,
						latestGroupId: item.latestGroupId
					} as WebsiteRecord)
			);
		} catch (error) {
			return {
				code: 500,
				message: 'Failed to get all website records'
			} as Error;
		}
	}
}
