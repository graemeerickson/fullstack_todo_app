// the mongoose.connect line needs to happen exactly once in your code
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todo-app-demo');

module.exports.Todo = require('./todo.js');