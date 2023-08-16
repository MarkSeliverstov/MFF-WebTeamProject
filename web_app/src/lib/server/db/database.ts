import { MongoClient } from 'mongodb';
import { MONGO_URL } from '$env/static/private'

const client: MongoClient = new MongoClient(MONGO_URL);

export function startDatabase() : Promise<MongoClient>{
  console.log("Connecting to database");
  return client.connect();
}

export default client.db();
