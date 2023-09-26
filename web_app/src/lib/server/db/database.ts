import { MongoClient } from 'mongodb';

const client: MongoClient = new MongoClient("mongodb://test:test1234@mongodb:27017/webapp");

export function startDatabase() : Promise<MongoClient>{
  console.log("Connecting to database");
  return client.connect();
}

export default client.db();
