const parser = require('body-parser');
const express = require('express');
const router = require('./routes.js');
const logger = require('morgan');

require('./database/db.js');

const port = process.env.PORT || 3333;
const app = express();

// middleware
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(logger('dev'));

// connection to router
app.use('/products', router);

app.listen(port, () => console.log(`Listening on port ${port}!`));
