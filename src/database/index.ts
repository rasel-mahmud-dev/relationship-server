import * as mongoDB from "mongodb";
import {Db, MongoClient} from "mongodb";

// Connection URI
const uri = process.env.DB_CONN_STRING as string
// Create a new MongoClient



function databaseConnection() {
    return new Promise<Db>(async (resolve, reject) => {
        try {
            const client = new MongoClient(uri);
            // Connect the client to the server (optional starting in v4.7)
            await client.connect();
            // Establish and verify connection
            let database  = await client.db("assignment-db")
            console.log("database connected")
            resolve(database)

        } catch (ex) {
            reject(ex)
        }
    })
}


export default  databaseConnection