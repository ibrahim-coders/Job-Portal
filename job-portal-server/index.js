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
      const email = req.query.email;
      let query = {};
      if (email) {
        query = { hr_email: email };
      }
      const cursor = jobColleaction.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
    //post
    app.post('/jobs', async (req, res) => {
      const newJob = req.body;
      const result = await jobColleaction.insertOne(newJob);
      res.send(result);
    });
    //get jobs details
    app.get('/jobs/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await jobColleaction.findOne(query);
      res.send(result);
    });
    //jobs application id
    app.get('/job-application/jobs/:job_id', async (req, res) => {
      const jobID = req.params.job_id;
      const query = { job_id: jobID };
      const result = await applicationColleaction.find(query).toArray();
      res.send(result);
    });
    //jobs applications apis
    app.post('/job-application', async (req, res) => {
      const application = req.body;
      const result = await applicationColleaction.insertOne(application);
      //count
      // const id = application.job_id;
      // const query = { _id: new ObjectId(id) };
      // const newCount = await jobColleaction.findOne(query);
      // if (job.applicationCount) {
      //   newCount = job.applicationCount + 1;
      // }
      // const filter = { _id: new ObjectId(id) };
      // const updateCount = {
      //   applicationCount: newCount,
      // };
      // const updateResult = await jobColleaction.updateOne(filter, updateCount);
      res.send(result);
    });
    //get jobs aplications
    app.get('/job-application', async (req, res) => {
      const email = req.query.email;
      const query = { application_email: email };
      const result = await applicationColleaction.find(query).toArray();
      for (const application of result) {
        console.log(application.job_id);
        const query1 = { _id: new ObjectId(application.job_id) };
        const job = await jobColleaction.findOne(query1);
        if (job) {
          application.title = job.title;
          application.location = job.location;
          application.company = job.company;
          application.company_logo = job.company_logo;
        }
      }
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
