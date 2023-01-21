import express, {NextFunction, Request, Response} from "express";


const cors = require("cors");''

import databaseConnection from "./database"


require('dotenv').config()
const app = express()

app.use(cors())
app.use(express.json())





// get all posts
app.get("/api/peoples", async (req, res) => {
    try {
        const db = await databaseConnection()
        const Post = db.collection("posts")
        const posts = await Post.find().toArray()
        res.status(200).send(posts)
    } catch (ex) {

        res.status(500).send("Internal Error")
    }

})



const PORT =  Number(process.env.PORT) || 2000

app.listen(PORT,  ()=>console.log("server is running on port " + PORT))

export default app;
module.exports  = app;
