// set up router
const express = require('express');
const indexRoute = express.Router();
const db = require('../models');
const bodyParser = require('body-parser');

// display home page
indexRoute.get('/', function(req, res) {
  res.render('../views/index');
})

// find all tasks
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

// find one task
indexRoute.get('/api/tasks/:id', function (req, res) {
  // get task id from url params (`req.params`)
  let taskIndex = req.params.id;
  console.log(db.Todo.collection.getIndexes());
  console.log(taskIndex);
  for (let key in db.Todo) {
    if(taskIndex === key) {
      let taskId = key.__id;
    }
  };
  console.log(taskId);

  // find task in db by id
  db.Todo.findOne({ _id: taskId }, function (err, foundTask) {
    res.json(foundTask);
  });
});

// create one task
indexRoute.post('/api/tasks', function(req, res) {
  let newTask = new db.Todo({task: req.body.task, description: req.body.description});
  newTask.save();
  res.json(newTask);
});

// delete one task
indexRoute.delete('/api/tasks/:id', function (req, res) {
  console.log('delete task:', req.params);
  // get todo id from url params (`req.params`)
  let taskId = req.params.id;
  // find task in db by id and remove
  db.Todo.findOneAndRemove({ _id: taskId }, function (err, deletedTask) {
    res.json(deletedTask);
  });
});

// router.post('/', function(req, res){
//   // use create to make todo item in db
//   res.send('POST todos route');
// });

// router.get('/:id', function(req, res){
//   res.send('GET specific todos route');
// });

module.exports = indexRoute;
