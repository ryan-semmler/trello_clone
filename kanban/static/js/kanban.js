//js file for kanban hw

$(document).ready(function() {

    $('#allTasks').click(function(event) {
        console.log("HI");

      $.ajax({
          type: "GET",
          url: 'http://127.0.0.1:8000/api/tasks/',
          success:
             console.log("success"),
      });
  })
});
