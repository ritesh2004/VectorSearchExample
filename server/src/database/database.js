const axios = require("axios")
const { MongoClient, ServerApiVersion } = require('mongodb');
const GenerateVector = require("../utils/GenerateVector.js");
const uri = "mongodb+srv://riteshpramanik22:aTIZfI6kfIXQHRcL@cluster0.k4iigpc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri);

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    const db = client.db("sample_mflix");
    const collection = db.collection("movies");

    // collection.find({plot : {$exists:true}}).skip(200).limit(50).toArray().then((d)=>{
    //   d.forEach((item)=>{
    //     GenerateVector(item.plot).then((vector)=>{
    //       const update = {$set : {'plot_embedding':vector}};

    //       collection.findOneAndUpdate({_id:item._id},update).then(()=>console.log("#"))
    //     })
    //   })
    // })

    return collection;
  } catch {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

module.exports = run;
