//js file for kanban hw


// shows all tasks on click, disables after one click
$('#allTasks').click(function(event) {
    event.preventDefault();

  $.ajax({
      type: "GET",
      url: 'api/tasks/',
      success: function(result) {
         $list = $('<ol>');
         $listItem = $('<li>');
         for(var i = 0; i < result.length; i++) {
            //just the title
            $listItem.attr('id', 'li_' + result[i].id)
            $itemTitle = result[i].title;
            //task details.
            $itemStatus = result[i].status;
            $itemPriority = result[i].priority;
            $task = $itemTitle + " [" + $itemStatus.slice(4, -1) + "] [" + $itemPriority.slice(4,-1) + ']'
            $listItem.append($task).append($('<img class=\'editTask\' src="/static/img/edit.png"/>')).append($('<img class=\'delTask\' src="/static/img/garbage.png"/></li>'));
            $list.append($listItem);
         }


      //  $('#allTasks').empty();
    //    $('#allTasks').append('<h2>All Tasks</h2>');
    $('#tasklist').append($list);

    //function to edit a task on click of pencil
    $('.editTask').click(function(event){
        event.preventDefault();
        $parentLi=$('.editTask').parent();
        $liId = $parentLi.attr('id').slice(-1);
        console.log($liId);

        $.ajax({
            method: 'PUT',
            url: '/api/tasks/' + $liId,
            success: function(results) {
                console.log(deleted)
            }
        })
    });
  }
});
$('#allTasks').off('click')
});
