import { Model, type Execution, type Error, isExecutionWithoutId } from '$lib/types';
import { type Collection, ObjectId, Long } from 'mongodb';
import db from '$db/database';

export default class ExecutionModel extends Model<Execution> {
	collection: Collection = db.collection('executions');
	async create(execution: Execution): Promise<ObjectId | Error> {
		try {
			if (!('ownerId' in execution)) {
				return {
					code: 400,
					message: 'Invalid execution without ID'
				} as Error;
			}

			if (!ObjectId.isValid(execution.ownerId)) {
				return {
					code: 400,
					message: 'Invalid Mongo ID'
				} as Error;
			}

			execution.ownerId = new ObjectId(execution.ownerId);

			if (!isExecutionWithoutId(execution)) {
				return {
					code: 400,
					message: 'Invalid execution without ID'
				} as Error;
			}

			// I need to do it this way because if I use BSON type int in the validator, it will not validate but using long is fine but Mongo needs it as the Long object.
			const preparedExecution = {
				groupId: execution.groupId,
				ownerId: execution.ownerId,
				root: execution.root,
				url: execution.url,
				crawlTimeStart: new Long(execution.crawlTimeStart),
				crawlTimeEnd: new Long(execution.crawlTimeEnd),
				status: execution.status,
				sitesCrawled: execution.sitesCrawled,
				links: execution.links,
				title: execution.title
			};

			const result = await this.collection.insertOne(preparedExecution);
			return result.insertedId;
		} catch (error) {
			return {
				code: 500,
				message: error
			} as Error;
		}
	}
	async getByID(id: string): Promise<Execution | Error> {
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
					ownerId: result.ownerId,
					groupId: result.groupId,
					root: result.root,
					url: result.url,
					crawlTimeStart: result.crawlTimeStart,
					crawlTimeEnd: result.crawlTimeEnd,
					status: result.status,
					sitesCrawled: result.sitesCrawled,
					links: result.links,
					title: result.title
				} as Execution;
			}

			return {
				code: 404,
				message: 'Execution not found'
			} as Error;
		} catch (error) {
			return {
				code: 500,
				message: 'Failed to get execution'
			} as Error;
		}
	}
	async update(id: string, updatedItem: Execution): Promise<Execution | Error> {
		try {
			if (!ObjectId.isValid(id)) {
				return {
					code: 400,
					message: 'Invalid Mongo ID'
				} as Error;
			}

			if (!('ownerId' in updatedItem)) {
				return {
					code: 400,
					message: 'Invalid execution without ID'
				} as Error;
			}

			if (!ObjectId.isValid(updatedItem.ownerId)) {
				return {
					code: 400,
					message: 'Invalid Mongo ID'
				} as Error;
			}

			updatedItem.ownerId = new ObjectId(updatedItem.ownerId);

			if (!isExecutionWithoutId(updatedItem)) {
				return {
					code: 400,
					message: 'Invalid execution without ID'
				} as Error;
			}

			// I need to do it this way because if I use BSON type int in the validator, it will not validate but using long is fine but Mongo needs it as the Long object.
			const preparedUpdatedItem = {
				groupId: updatedItem.groupId,
				ownerId: updatedItem.ownerId,
				root: updatedItem.root,
				url: updatedItem.url,
				crawlTimeStart: new Long(updatedItem.crawlTimeStart),
				crawlTimeEnd: new Long(updatedItem.crawlTimeEnd),
				status: updatedItem.status,
				sitesCrawled: updatedItem.sitesCrawled,
				links: updatedItem.links,
				title: updatedItem.title
			};

			const result = await this.collection.updateOne(
				{ _id: new ObjectId(id) },
				{ $set: preparedUpdatedItem }
			);
			if (result.modifiedCount > 0) {
				return {
					id: new ObjectId(id),
					...updatedItem
				} as Execution;
			}
			return {
				code: 404,
				message: 'Execution not found or no changes were made'
			} as Error;
		} catch (error) {
			return {
				code: 500,
				message: 'Failed to update execution'
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
				message: 'Execution not found'
			} as Error;
		} catch (error) {
			return {
				code: 500,
				message: 'Failed to delete website record'
			} as Error;
		}
	}

	async getAll(): Promise<Execution[] | Error> {
		try {
			const result = await this.collection.find({ root: true }).toArray();
			return result.map(
				(item) =>
					({
						id: item._id,
						ownerId: item.ownerId,
						groupId: item.groupId,
						root: item.root,
						url: item.url,
						crawlTimeStart: item.crawlTimeStart,
						crawlTimeEnd: item.crawlTimeEnd,
						status: item.status,
						sitesCrawled: item.sitesCrawled,
						links: item.links,
						title: item.title
					} as Execution)
			);
		} catch (error) {
			return {
				code: 500,
				message: 'Failed to get all root executions'
			} as Error;
		}
	}

	async getAllByOwnerIdAndGroupId(ownerId: string, groupId: number): Promise<Execution[] | Error> {
		try {
			if (!ObjectId.isValid(ownerId)) {
				return {
					code: 400,
					message: 'Invalid Mongo ID'
				} as Error;
			}

			if (typeof groupId !== 'number' || groupId < 0) {
				return {
					code: 400,
					message: 'Invalid group ID'
				} as Error;
			}

			const result = await this.collection
				.find({ ownerId: new ObjectId(ownerId), groupId })
				.toArray();
			return result.map(
				(item) =>
					({
						id: item._id,
						ownerId: item.ownerId,
						groupId: item.groupId,
						root: item.root,
						url: item.url,
						crawlTimeStart: item.crawlTimeStart,
						crawlTimeEnd: item.crawlTimeEnd,
						status: item.status,
						sitesCrawled: item.sitesCrawled,
						links: item.links,
						title: item.title
					} as Execution)
			);
		} catch (error) {
			return {
				code: 500,
				message: 'Failed to get all executions by owner ID and group ID'
			} as Error;
		}
	}

	async deleteAllByOwnerId(ownerId: string): Promise<boolean | Error> {
		try {
			if (!ObjectId.isValid(ownerId)) {
				return {
					code: 400,
					message: 'Invalid Mongo ID'
				} as Error;
			}

			const result = await this.collection.deleteMany({ ownerId: new ObjectId(ownerId) });
			if (result.deletedCount > 0) {
				return true;
			}
			return {
				code: 404,
				message: 'Execution not found'
			} as Error;
		} catch (error) {
			return {
				code: 500,
				message: 'Failed to delete executions'
			} as Error;
		}
	}
}
