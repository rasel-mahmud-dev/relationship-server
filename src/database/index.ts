require('dotenv').config()
import * as mongoDB from "mongodb";
import {Db, MongoClient} from "mongodb";

// Connection URI
const uri = process.env.DB_CONN_STRING as string

// Create a new MongoClient
const mongoClient = new MongoClient(uri);
const clientPromise = mongoClient.connect();

let database: Db;
let DB_NAME = "relationship-db"


function databaseConnection() {
    return new Promise<mongoDB.Db>((async (resolve, reject) => {
        try {
            if (!database) {
                database = (await clientPromise).db(DB_NAME);
            }
            resolve(database)
        } catch (ex) {
            reject(ex)
        }
    }))
}


export default databaseConnection