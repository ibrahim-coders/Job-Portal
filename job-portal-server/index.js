const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.JOBS_USER}:${process.env.JOBS_PASS}@cluster0.whh17.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 });
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    );
    //jobs apis
    const jobColleaction = client.db('jobs_portal').collection('jobs');
    const applicationColleaction = client
      .db('jobs_portal')
      .collection('apply_jobs');
    app.get('/jobs', async (req, res) => {
      const cursor = jobColleaction.find();
      const result = await cursor.toArray();
      res.send(result);
    });
    //get jobs details
    app.get('/jobs/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await jobColleaction.findOne(query);
      res.send(result);
    });
    //jobs applications apis
    app.post('/job-application', async (req, res) => {
      const application = req.body;
      const result = await applicationColleaction.insertOne(application);
      res.send(result);
    });
    //get jobs aplications
    app.get('/job-application', async (req, res) => {
      const email = req.query.email;
      const query = { application_email: email };
      const result = await applicationColleaction.find(query).toArray();
      res.send(result);
    });
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('jobs portal server is runing now');
});

app.listen(port, () => {
  console.log(`Jobs is waiting at: ${port}`);
});
