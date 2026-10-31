import { MongoClient } from "mongodb";
import dns from "node:dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const uri = process.env.MONGODB_URI 
const dbName = process.env.MONGODB_DB 

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export async function getMongoClient() {
  return clientPromise;
}

export async function getMongoDb() {
  const connectedClient = await clientPromise;
  return connectedClient.db(dbName);
}