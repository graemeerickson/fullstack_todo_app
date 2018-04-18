// set up router
const express = require('express');
const indexRoute = express.Router();
const db = require('../models');
const bodyParser = require('body-parser');

indexRoute.get('/', function(req, res) {
  res.render('../views/index');
})

indexRoute.get('/api/tasks', function(req, res){
  // send all todos as JSON response
  db.Todo.find(function(err, tasks){
    if (err) {
      console.log("index error: " + err);
      res.sendStatus(500);
    }
    res.json(tasks);
  });
});

indexRoute.post('/api/tasks', function(req, res) {
  console.log(req);
  var newTask = new db.Todo({task: req.body.task, description: req.body.description});
  newTask.save();
  res.json(newTask);
});

// router.post('/', function(req, res){
//   // use create to make todo item in db
//   res.send('POST todos route');
// });

// router.get('/:id', function(req, res){
//   res.send('GET specific todos route');
// });

module.exports = indexRoute;
