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
            $listItem.append($task).append('<img class=editTask src="static/img/edit.png"/>').append('<a href="/"<img class=delTask src="/static/img/garbage.png"/></li>');
            //add list item to list
            $list.append($listItem);
        }
        //add list to div
        $('#allTasks').empty();
        $('#allTasks').append($list);

    }
});

});

//function to delete a task on click of the rubbish bin
// $('#allTasks').on('click', '.delTask', function(event){
//     $parentLi = $('.delTask').parent();
//     $liId = $parentLi.attr('id').slice(-1);
//     console.log('del');
//
//     $.ajax({
//         method: 'DELETE',
//         url: '/api/tasks/' + $liId,
//         success: function(results) {
//             console.log('deleted');
//         }
//       })
//     });


//stuff i think i need somewhere
function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});

//function to edit a task on click of pencil
$('#allTasks').on('click', ".editTask", function(event) {
    $parentLi = $('.editTask').parent();
    $liId = $parentLi.attr('id').slice(-1);
    console.log('edit');

    $.ajax({
        method: 'PUT',
        url: '/api/tasks/' + $liId,
        success: function(results) {
            console.log("editted");
        }
    })
});
