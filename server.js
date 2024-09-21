require('dotenv').config();

const express = require('express');
const mongodb = require('./data/database');
const app = express();

const port = process.env.PORT || 8080;

app.use('/', require('./routes')); 

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Database is listening and node running on localhost:${port}`);
            console.log(`Add 'users' at the end of URL to see users json data`);
        });
    }
});