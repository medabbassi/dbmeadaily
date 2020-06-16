const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
bodyParser = require('body-parser');
const users = require('./routes/users');
const admins = require('./routes/admins');
const auth = require('./routes/auth');
const authadmin = require('./routes/authadmin');
const express = require('express');
const app = express();

mongoose.connect('mongodb+srv://medaily:medaily@clusterdb-333qh.gcp.mongodb.net/medaily?retryWrites=true&w=majority')
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://medaily:medaily@clusterdb-333qh.gcp.mongodb.net/medaily?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   console.log(err);  
// const collection = client.db("test").collection("devices");

//   // perform actions on the collection object
//   client.close();
// });

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/users', users);
app.use('/api/admins', admins);
app.use('/api/auth', auth);
app.use('/api/authadmin',authadmin);
const port = process.env.PORT || 4000;
//app.listen(port, ()=> console.log(`listening on port ${port}......`+ port));
app.listen(port, "0.0.0.0", () => console.log(`listening at http://localhost:${port}`));