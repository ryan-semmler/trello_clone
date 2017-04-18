//js file for kanban hw


// shows all tasks on click, disables after one click
$('#allTasks').click(function(event) {
    event.preventDefault();

  $.ajax({
      type: "GET",
      url: 'api/tasks/',
      success: function(result) {
         $list = $('<ol>');
         $listItem = $('<li>')
         for(var i = 0; i < result.length; i++) {
            //just the title
            $itemTitle = result[i].title;
            //task details.
            $itemStatus = result[i].status;
            $itemPriority = result[i].priority;
            $task = $itemTitle + " [" + $itemStatus.slice(3, -1) + "] [" + $itemPriority.slice(3,-1) + ']'
            $listItem.append($task).append($('<img class=\'editTask\' src="/static/img/edit.png"/>')).append($('<img class=\'delTask\' src="/static/img/garbage.png"/>'));
            $list.append($listItem);
         }


      //  $('#allTasks').empty();
    //    $('#allTasks').append('<h2>All Tasks</h2>');
    $('#tasklist').append($list);

  }
});
$('#allTasks').off('click')
});

//on click, shows a new form to add, will make ajax call on click of submit btn
$('#addTask').click(function(event) {
    event.preventDefault();
    console.log('click');
});
