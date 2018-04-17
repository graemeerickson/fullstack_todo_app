// set up router
const express = require('express');
const indexRoute = express.Router();

indexRoute.get('/', function(req,res) {
  let data = {
    title: 'Example title'
  }
  res.render('index', data)
})

module.exports = indexRoute;
