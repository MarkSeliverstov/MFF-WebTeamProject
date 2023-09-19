import { Model, type Execution } from '$lib/types';
import { type Collection, ObjectId } from 'mongodb';
import db from '$db/database';

export default class ExecutionModel extends Model<Execution> {
	collection: Collection = db.collection('executions');
	async create(execution: Execution): Promise<ObjectId | null> {
		try {
			const result = await this.collection.insertOne(execution);
			return result.insertedId;
		} catch (error) {
			console.log(error);
			return null;
		}
	}
	async getByID(id: string): Promise<Execution | null> {
		try {
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
			return null;
		} catch (error) {
			console.log(error);
            return null;
		}
	}
	async update(id: string, updatedItem: Execution): Promise<Execution | null> {
		try {
			const result = await this.collection.updateOne(
				{ _id: new ObjectId(id) },
				{ $set: updatedItem }
			);
			if (result.modifiedCount > 0) {
				return updatedItem;
			}
			return null;
		} catch (error) {
			console.log(error);
			return null;
		}
	}
	async delete(id: string): Promise<boolean> {
		try {
			const result = await this.collection.deleteOne({ _id: new ObjectId(id) });
			return result.deletedCount > 0;
		} catch (error) {
			console.log(error);
			return false;
		}
	}

	async getAll(): Promise<Execution[]> {
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
			console.log(error);
			return [];
		}
	}

    async getAllByOwnerIdAndGroupId(ownerId: string, groupId: number): Promise<Execution[]> {
        try {
            const result = await this.collection.find({ ownerId: new ObjectId(ownerId), groupId }).toArray();
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
        }
        catch (error) {
            console.log(error);
            return [];
        }
    }

    async deleteAllByOwnerId(ownerId: string): Promise<boolean> {
        try {
            const result = await this.collection.deleteMany({ ownerId: new ObjectId(ownerId) });
            return result.deletedCount > 0;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
}
