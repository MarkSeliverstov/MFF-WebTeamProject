import { Model, type WebsiteRecord } from '$lib/types';
import { type Collection, ObjectId } from 'mongodb';
import db from '$db/database';

export default class WebsiteRecordModel extends Model<WebsiteRecord> {
	collection: Collection = db.collection('webpage_records');
	async create(websiteRecord: WebsiteRecord): Promise<ObjectId | null> {
		try {
			const result = await this.collection.insertOne(websiteRecord);
			return result.insertedId;
		} catch (error) {
			console.log(error);
			return null;
		}
	}
	async getByID(id: string): Promise<WebsiteRecord | null> {
		try {
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
			return null;
		} catch (error) {
			console.log(error);
			return null;
		}
	}
    async update(id: string, updatedItem: WebsiteRecord): Promise<WebsiteRecord | null> {
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
    async getAll(): Promise<WebsiteRecord[]> {
        try {
            const result = await this.collection.find().toArray();
            return result.map((item) => ({
                id: item._id,
                url: item.url,
                periodicity: item.periodicity,
                regexp: item.regexp,
                label: item.label,
                active: item.active,
                tags: item.tags,
                latestGroupId: item.latestGroupId
            } as WebsiteRecord));
        } catch (error) {
            console.log(error);
            return [];
        }
    }
}
