//js file for kanban hw

$(document).ready(function() {

    $('#allTasks').click(function(event) {
        console.log("HI");

      $.ajax({
          type: "GET",
          url: 'api/tasks/',
          success: function(result) {
             console.log("success"),
             $box = $('<div>'),
             $($box).append(result),
           }
        $('#allTasks').empty(),
        $('#allTasks').append('<h2>All Tasks</h2>'),
        $('#allTasks').append($box),
    });
  })
});
