//js file for kanban hw


// view all
$('#allTasks').click(function(event) {
    event.preventDefault();
    $list = $('<ol>');

  $.ajax({
      type: "GET",
      url: 'api/tasks/',
      success: function(result) {
         for(var i = 0; i < result.length; i++) {
             $listItem = $('<li>');
            //just the title
            $listItem.attr('id', 'li_' + result[i].id)
            $itemTitle = result[i].title;
            //task details.
            $itemStatus = result[i].status;
            $itemPriority = result[i].priority;
            $task = $itemTitle + " [" + $itemStatus.slice(4, -1) + "] [" + $itemPriority.slice(4,-1) + ']'
            //add task to list item
            $listItem.append($task).append('<img class=editTask src="static/img/edit.png"/>').append('<img class=delTask src="/static/img/garbage.png"/></li>');
            //add list item to list
            $list.append($listItem);
        }
        //add list to div
        $('#allTasks').append($list);

    }
});
$('#allTasks').off('click')
});

//function to delete a task on click of the rubbish bin
$('.delTask').click(function(event){
    $parentLi = $('.delTask').parent();
    $liId = $parentLi.attr('id').slice(-1);
    console.log($liId);

    $.ajax({
        method: 'DELETE',
        url: '/api/tasks/' + $liId,
        success: function(results) {
            console.log('deleted');
        }
    })
});

//function to edit a task on click of pencil
$('.editTask').click(function(event) {
    event.preventDefault();
    $parentLi = $('.editTask').parent();
    $liId = $parentLi.attr('id').slice(-1);
    console.log($liId);

    $.ajax({
        method: 'PUT',
        url: '/api/tasks/' + $liId,
        success: function(results) {
            console.log("editted");
        }
    })
});
