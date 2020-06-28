// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');
const cors = require('cors');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website')); //points to 'website' project folder

// Setup Server
const port = 8000; //what port we want to use 'localhost:8000'

const server = app.listen(port, function(){
  console.log(`Server running on localhost:${port}`); //prints to terminal ''
})
