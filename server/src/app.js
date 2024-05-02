const express = require("express");
const mongoose = require("mongoose");
const run = require("./database/database.js");
const cors = require("cors");
const axios = require("axios");
const GenerateVector = require("./utils/GenerateVector.js");

const app = express();

const collection = run();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.get("/", (req, res) => {
  return res.send("Working").status(200);
});

app.get("/all", async (req, res) => {
  collection.then((data) => {
    data
      .find({plot_embedding : {$exists:true}})
      .toArray()
      .then((d) => {
        return res.status(200).json({ success: true, data: d});
      });
  });
});

app.get("/query/:query", async (req, res) => {
  const { query } = req.params;
  console.log(query);

  const collect = await collection;

  collect.aggregate([
      {
        "$vectorSearch": {
          "index": "plotVectorIndex",
          "path": "plot_embedding",
          "queryVector": await GenerateVector(query),
          "numCandidates": 150,
          "limit": 4
        }
      }
    ]).toArray().then((d)=>{
      return res.status(200).json({ success: true, message: `${d.length} results founds`,data:d });
  })


});

module.exports = app;
