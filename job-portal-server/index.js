const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
//middleware

app.use(
  cors({
    origin: ['http://localhost:5173'],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const logger = (req, res, next) => {
  console.log('inside the looger', req.cookies);

  next();
};

const verifToken = (req, res, next) => {
  console.log('inside varify token');
  const token = req?.cookies?.token;
  if (!token) {
    return res.status(401).send({ message: 'unauthorized access' });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Authorized access' });
    }
    req.user = decoded;
    next();
  });
};
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

    //Auth related APIs
    app.post('/jwt', async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '8h' });

      res
        .cookie('token', token, {
          httpOnly: true,
          secure: false,
        })
        .send({ success: true });
    });
    //post jwt
    app.post('/logOut', (req, res) => {
      res
        .clearCookie('token', {
          httpOnly: true,
          secure: false,
        })
        .send({ success: true });
    });

    app.get('/jobs', async (req, res) => {
      const email = req.query.email;
      let query = {};
      if (email) {
        query = { hr_email: email };
      }
      const cursor = jobColleaction.find(query).limit(8);
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get('/jobss', async (req, res) => {
      const email = req.query.email;
      const sort = req.query?.sort;
      const search = req.query?.search;
      let query = {};
      let sortQuery = {};
      console.log(sort);
      if (email) {
        query = { hr_email: email };
      }
      if (sort == 'true') {
        sortQuery = { 'salaryRange.min': -1 };
      }
      if (search) {
        query.location = { $regex: search, $options: 'i' };
      }
      const cursor = jobColleaction.find(query).sort(sortQuery);
      const result = await cursor.toArray();
      res.send(result);
    });
    // app.get('/all-jobs', async (req, res) => {
    //   const cursor = jobColleaction.find();
    //   const result = await cursor.toArray();
    //   console.log(result);
    //   res.send(result);
    // });
    //post
    app.post('/jobs', logger, async (req, res) => {
      console.log('now inside the api callback');
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
      const jobId = req.params.job_id;
      const query = { job_id: jobId };
      const result = await applicationColleaction.find(query).toArray();
      res.send(result);
    });
    //jobs applications apis
    app.post('/job-application', async (req, res) => {
      const application = req.body;
      const result = await applicationColleaction.insertOne(application);

      //count
      const id = application.job_id;
      const query = { _id: new ObjectId(id) };
      const job = await jobColleaction.findOne(query);
      let newCount = 0;
      if (job.applicationCount) {
        newCount = job.applicationCount + 1;
      } else {
        newCount = 1;
      }

      // now update the job info
      const filter = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: {
          applicationCount: newCount,
        },
      };

      const updateResult = await jobColleaction.updateOne(filter, updatedDoc);
      console.log(updateResult);
      res.send(result);
    });
    //get jobs aplications
    app.get('/job-application', verifToken, async (req, res) => {
      const email = req.query.email;
      const query = { application_email: email };
      if (req.user.email !== req.query.email) {
        return res.status(403).send({ message: 'forbidden access' });
      }
      console.log('cookes', req.cookies);
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
    app.patch('/job-application/:id', async (req, res) => {
      const id = req.params.id;
      const data = req.body;
      const filter = { _id: new ObjectId(id) };
      const update = {
        $set: {
          status: data.status,
        },
      };
      const result = await applicationColleaction.updateOne(filter, update);
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
