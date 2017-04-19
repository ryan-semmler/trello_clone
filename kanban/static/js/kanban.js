//js file for kanban hw


// view all
$('#allTasks').click(function(event) {
    event.preventDefault();
    $list = $('<ol id="tasks">');

  $.ajax({
      type: "GET",
      url: 'api/tasks/',
      success: function(result) {
         $listItem = $('<li>');
         for(var i = 0; i < result.length; i++) {
            //just the title
            $listItem.attr('id', 'li_' + result[i].id)
            $itemTitle = result[i].title;
            //task details.
            console.log($itemTitle);
            $itemStatus = result[i].status;
            $itemPriority = result[i].priority;
            $task = $itemTitle + " [" + $itemStatus.slice(4, -1) + "] [" + $itemPriority.slice(4,-1) + ']'
            console.log($task);
            $listItem.append($task).append('<img class=editTask src="static/img/edit.png"/>').append('<img class=delTask src="/static/img/garbage.png"/></li>');
            console.log($listItem);
            // $listItem.append("</li>");
            console.log($listItem)
            $list.append($listItem);
            $('#allTasks').append($list);
        }
    }
});

    //function to delete a task on click of the rubbish bin
    $('.deleteTask').click(function(event){
        event.preventDefault();
        $parentLi = $('.deleteTask').parent();
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
    $('.editTask').click(function(event){
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

$('#allTasks').off('click')
});
