/* eslint-disable prefer-const */
/* eslint-disable no-var */
import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = 'mongodb+srv://supungunawardaname:FK6NTmXcTfuN98IW@snapsbymadz.2m1deba.mongodb.net/?retryWrites=true&w=majority&appName=SnapsbyMadz'!;
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

let client;
let clientPromise: Promise<MongoClient>;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export default clientPromise;
