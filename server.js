// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;
const server = app.listen(port, listen);

// the listen function 
function listen(){
    console.log(`this server is running on port : ${port}`)
}

// the get function which sends projectData
app.get('/all', send);
function send(req, res){
    res.send(projectData);
}


app.post('/add', add);
    function add (req, res){
        projectData['date'] = req.body.date;
        projectData['temp'] = req.body.temp;
        projectData['content'] = req.body.content;
        res.send(projectData);
    };
