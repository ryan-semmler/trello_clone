//js file for kanban hw

$('<body>').click(function(event) {
  console.log("hi");
})

$('#allTasks').click(function(event) {
    event.preventDefault();
    console.log("HI");

  $.ajax({
      type: "GET",
      url: 'api/tasks/',
      success: function(result) {
         console.log("success");

         $list = $('<ol>');

         for(var i = 0; i < result.length; i++) {
            console.log(result[i]);
            $listItem = $('<li>');
            $listItem.html(result[i].title);
            $list.append($listItem);
         }

      //  $('#allTasks').empty();
    //    $('#allTasks').append('<h2>All Tasks</h2>');
    $('#tasklist').append($list);
  }
})
});
