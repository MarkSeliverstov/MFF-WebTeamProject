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
					executionId: result._id,
					websiteRecordId: result.websiteRecordId,
					crawlTimeStart: result.crawlTimeStart,
					crawlTimeEnd: result.crawlTimeEnd,
					status: result.status,
					sitesCrawled: result.sitesCrawled
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
			const result = await this.collection.find().toArray();
			return result.map(
				(item) =>
					({
                        executionId: item._id,
                        websiteRecordId: item.websiteRecordId,
                        crawlTimeStart: item.crawlTimeStart,
                        crawlTimeEnd: item.crawlTimeEnd,
                        status: item.status,
                        sitesCrawled: item.sitesCrawled
					} as Execution)
			);
		} catch (error) {
			console.log(error);
			return [];
		}
	}
    async getAllByWebsiteRecordId(websiteRecordId: string): Promise<Execution[]> {
        try {
            const result = await this.collection.find({ websiteRecordId: new ObjectId(websiteRecordId) }).toArray();
            return result.map(
                (item) =>
                    ({
                        executionId: item._id,
                        websiteRecordId: item.websiteRecordId,
                        crawlTimeStart: item.crawlTimeStart,
                        crawlTimeEnd: item.crawlTimeEnd,
                        status: item.status,
                        sitesCrawled: item.sitesCrawled
                    } as Execution)
            );
        }
        catch (error) {
            console.log(error);
            return [];
        }
    }

    async deleteAllByWebsiteRecordId(websiteRecordId: string): Promise<boolean> {
        try {
            const result = await this.collection.deleteMany({ websiteRecordId: new ObjectId(websiteRecordId) });
            return result.deletedCount > 0;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
}
