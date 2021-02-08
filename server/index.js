const parser = require('body-parser');
const express = require('express');
const router = require('./routes.js');
const cors = require('cors');

//require('../ETL/streams/run-streams.js');

const port = process.env.PORT || 3333;
const app = express();

app.use(cors());

// middleware
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(express.static('./client/dist'));

// connection to router
app.use('/products', router);

app.listen(port, () => console.log(`Listening on port ${port}!`));
