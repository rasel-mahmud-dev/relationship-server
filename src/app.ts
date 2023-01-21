import express, {NextFunction, Request, Response} from "express";


const cors = require("cors");''

import databaseConnection from "./database"
import { People } from "./types";



const app = express()

app.use(cors())
app.use(express.json())



// get all peoples
app.get("/api/peoples",  async (req: Request, res: Response) => {
    try {
        const db = await databaseConnection()
        const PeopleCollection = db.collection("peoples")
        const peoples = await PeopleCollection.find().toArray()
        res.status(200).send(peoples)
    } catch (ex) {

        res.status(500).send("Internal Error")
    }

})


// add people
app.post("/api/peoples", async (req: Request, res: Response) => {
    try {
        const {name, friends = []} = req.body
        const db = await databaseConnection()
        const PeopleCollection = db.collection("peoples")

        let newPeople: People = {
            name,
            friends
        }
        let doc = await PeopleCollection.insertOne(newPeople)

        if(doc.insertedId){
            return res.status(200).send({
                ...newPeople,
                _id: doc.insertedId 
            })
        } 

        res.status(500).send("Internal Error")
     

    } catch (ex) {
        res.status(500).send("Internal Error")
    }

})




const PORT =  Number(process.env.PORT) || 2000

app.listen(PORT,  ()=>console.log("server is running on port " + PORT))

export default app;
module.exports  = app;
