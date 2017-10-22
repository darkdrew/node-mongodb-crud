// NPM modules
const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

// LocalFiles
const db = require('./config/db');

// create express app
const app = express();

// Express app needs to use parser to parse json data
app.use(bodyParser.json());

MongoClient.connect(db.url , (error, db) => {
  if(error) {
    return console.log('Unable to connect to MongoDB server');
  };
    console.log('Connected to MongoDB server');

    // Importing from blog routes
    // and calling args (app and db) to the function there.
    require('./app/routes')(app, db);

    // Telling app to listen PORT for HTTP request
    let port = process.env.PORT || 3000
    app.listen(port,() => {
      console.log(`This app is listening to port : ${port}`);
    });

    // // close the connection of mongodb server
    // db.close();
});
