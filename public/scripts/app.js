console.log("Sanity Check: JS is working!");
var $todoList;
var allTasks = [];

$(document).ready(function(){

  $todoList = $('#taskTarget');
  // $.ajax({
  //   method: 'GET',
  //   url: '/',
  //   success: handleSuccess,
  //   error: handleError
  // });

  $.ajax({
    method: 'GET',
    url: '/api/tasks',
    success: handleSuccess,
    error: handleError
  });

  $('#newTaskForm').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/tasks',
      data: $(this).serialize(),
      success: newTaskSuccess,
      error: newTaskError
    });
  });

  function getTaskHtml(todo) {
    return `<hr>
            <p>
              <b>${todo.task}</b>
              by ${todo.description}
              <button type="button" name="button" class="deleteBtn btn btn-danger pull-right" data-id=${todo._id}>Delete</button>
            </p>`;
  }

  function getAllTasksHtml(tasks) {
    return tasks.map(getTaskHtml).join("");
  }

  // helper function to render all posts to view
  // note: we empty and re-render the collection each time our post data changes
  function render () {
    // empty existing posts from view
    $todoList.empty();

    // pass `allTodos` into the template function
    var taskHtml = getAllTasksHtml(allTasks);

    // append html to the view
    $todoList.append(taskHtml);
  };

  function handleSuccess(json) {
    allTasks = json;
    render();
  }

  function handleError(e) {
    $('#taskTarget').text('Failed to load todos, is the server working?');
  }

  function newTaskSuccess(json) {
    $('#newTaskForm input').val('');
    allTasks.push(json);
    render();
  }

  function newTaskError() {
    console.log('new todo error!');
  }

});