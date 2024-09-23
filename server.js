require('dotenv').config();

const express = require('express');
const mongodb = require('./data/database');
const bodyParser = require('body-parser');
const app = express();

const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(express.static('frontend'));
app.use('/', require('./routes')); 

mongodb.initDb((err) => {
    if (err) {
        console.log(err); 
    } else {
        app.listen(port, () => {
            // run command: 'node server.js'
            console.log(`Server is running and listening on http://localhost:${port}`);  
        });
    }
});