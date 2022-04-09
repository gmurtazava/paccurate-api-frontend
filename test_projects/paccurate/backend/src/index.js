const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongo = require("mongodb");
const { default: axios } = require("axios");
dotenv.config();

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const MongoClient = mongo.MongoClient;
const MONGO_URL = "mongodb://localhost:27017/";
const url = "https://api.paccurate.io";

app.get("/", (req, res) => {
  res.send("Somebody ping me was that you ?");
});

app.post("/pack", (req, res) => {
  console.log('inside')
  response = axios.post(url, req.body, {
      headers: {
        Authorization: process.env.paccurate_api_key,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log(response.data)
      insertIntoDatabase(req, response.data);
      return res.json(response.data)
    });
});

const insertIntoDatabase = (req, data) => {
  MongoClient.connect(MONGO_URL, function(err, db) {
    if (err) throw err;
    const dbo = db.db("mydb");
    const myobj = {
      boxes: data.boxes,
      svgs: data.svgs,
      method: req.body.boxTypeSets[0]
    };
    dbo.collection("analytics").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });
}

app.get('/analyze', (req, res) => {
  MongoClient.connect(MONGO_URL+ '/mydb', (err, db) => {
    if (err) throw err;
    const dbo = db.db("mydb");
    const data = dbo.collection("analytics").find().toArray((err, objects) => {
      res.send(JSON.stringify(objects));
    })
  })
})

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
