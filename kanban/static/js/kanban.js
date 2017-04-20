//js file for kanban
//will Warren
//ryan semmler

//stuff i need later
function csrfSafeMethod(method) {
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

//stuff I need later
var csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();
//later
$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});

//stuff I need later
let STATUS_CHOICE = ['<option value="not started"> 1, not started</option>', '<option value="in progress"> 2, in progress </option>', '<option value="completed"> 3, completed</option>']
let PRIORITY_CHOICE = ['<option value="low priority">1, low priority</option>', '<option value="medium-rare priority">2, medium-rare priority</option>', '<option value="medium priority">3, medium priority</option>', '<option value="medium priority">4, medium-well priority</option>', '<option value="medium priority">5, top priority</option>']

//view add new form
$('#addTask').on('click', function(event) {
    console.log("hi");
    $('#newTaskForm').fadeIn();
});
// view all
$('#allTasks').click(function(event) {
    event.preventDefault();
    $list = $('<ol class="list_decoration">');

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
            //$itemStatus = result[i].status;         //where did this go?
            //$itemPriority = result[i].priority;
            //add task to list item
            $listItem.append($itemTitle).append('<img class=editTask src="static/img/edit.png"/>').append('<img class=delTask src="/static/img/garbage.png"/></li>');
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
$('#allTasks').on('click', '.delTask', function(event){
    $parentLi = $('.delTask').parent();
    $liId = $parentLi.attr('id').slice(-1);
    console.log('del');

    $.ajax({
        method: 'DELETE',
        url: '/api/tasks/' + $liId + '/delete/',
        success: function(results) {
            console.log('deleted');
        }
      })

    });

//function to edit a task on click of pencil
$('#allTasks').on('click', ".editTask", function(event) {
    //get li id to complete ajax url call
    $parentLi = $('.editTask').parent();
    $itemToEdit = $(this).parent();
    $liId = $parentLi.attr('id').slice(-1);
    //make edit form
    $form_p = $('<form method="PUT" name="editForm">');
    $text = $('<input type="text" name="text">');
    $status = $('<select name="status">');
    $priority = $('<select name="priority">');
    $submit = $('<input type="submit" value="Edit Task" id="edit">');
    // add stuff to form
    $text.append($itemToEdit[0].innerText);
    $status.append(STATUS_CHOICE);
    $priority.append(PRIORITY_CHOICE);
    // add to p tags
    $form_p.append($text).append($status).append($priority);
    // add info form to div
    $('#editTasks').empty();
    $('#editTask').append($form_p).append($submit);

    $("#edit").click(function(event) {
        event.preventDefault();
        console.log('click');
        $info = $('#edit-form :input')
        console.log($info);
        var $form = {
            'title': $('[name="text"]').val(),
            'status': $('[name="status"]').val(),
            'priority': $('[name="priority"]').val(),
        }

        $.ajax({
            method: 'PUT',
            url: '/api/tasks/' + $liId + '/edit/',
            data: $form,
            success: function(results) {
                console.log("editted");
                $success = $('<h2 id="success">Task Added!</h2>');s
            }
        })
    });

});

//add success or failure message for adding a task
$('')
