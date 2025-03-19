
// import routes
const authRoutes = require("./routes/auth");
// const webhookListener = require("./webhookListener");

// create server
const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors()); // Enable CORS for all routes
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 3001;


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://arifthehappy:hiLIQF6g7CLXJH58@cluster0.9v651.mongodb.net/?appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


// basic route
app.get("/", (req, res) => {
  res.send("Hello World!");
});


// use routes
app.use("/auth", authRoutes);
// app.use("/webhooks", webhookListener);



// start server
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});

module.exports = app;

