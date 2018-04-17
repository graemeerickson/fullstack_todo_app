// SETUP

//require express and body-parser, and include data models
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('morgan');
const mongoose = require('mongoose');
const db = require('./models');

// generate a new express app
const app = express();

// serve static files in public
app.use(express.static('public'));

// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));

// initialize environment port and start listening
const PORT = 3000;
app.listen(PORT, function() {
  console.log(`listening on port ${PORT}`);
});

// set view engine, using ejs
app.set('views', './views');
app.set('view engine', 'ejs');

// ROUTES

// error logger & static routes
app.use(logger('dev'));
app.use('/static', express.static(path.join(__dirname, 'public')));

// route to index
app.use('/', require('./routes/index'));

// error handler
app.get('*', function(req, res) {
  res.status(404).send({message: 'Oops! Not found.'});
});