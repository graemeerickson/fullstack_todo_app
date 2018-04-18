const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var TodoSchema = new Schema({
  task: String,
  description: String
});

var Todo = mongoose.model('Todo',TodoSchema);

module.exports = Todo;
