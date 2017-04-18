from django.shortcuts import render, redirect
from rest_framework import status, permissions
from rest_framework.decorators import api_view
from django.contrib.auth.decorators import login_required
from rest_framework.response import Response
from .models import Task
from .serializers import TaskSerializer
from .forms import TaskForm, UserForm
from rest_framework import viewsets


# Create your views here.


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all().order_by('status')
    serializer_class = TaskSerializer

def login(request):
    f = UserForm(request.POST)
    return render(request, "registration/login.html", {'form': f})


@api_view(['GET'])
def view_all_tasks(request):
    ''' view all tasks '''
    tasks = Task.objects.all()
    serializer = TaskSerializer(tasks, many=True)
    # permissions_classes = (permissions.IsAuthenticatedOrReadOnly,)
    return Response(serializer.data)


@api_view(['GET'])
def view_task_detail(request, detail_id):
    '''view all details for one task'''
    specific_task = Task.objects.get(id=detail_id)
    serializer = TaskSerializer(specific_task, many=False)
    # permissions_classes = (permissions.IsAuthenticatedOrReadOnly,)
    return Response(serializer.data)


@api_view(['GET'])
@login_required
def user_detail(request, user_id):
    '''view all tasks created by a specific user'''
    user_tasks = Task.objects.get(owner_id=user_id)
    serializer = TaskSerializer(user_tasks, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@login_required
def delete_task(request, detail_id):
    '''delete a single task'''
    trash_task = Task.objects.get(id=detail_id)
    if trash_task.delete():
        return redirect('tasks')
    else:
        return "error"


@login_required
def new_task(request):


    return render(request, "tasks/create.html", {"task_form": new_task, "user": user, "test": "test"})


def index(request):
    '''UI homepage'''
    '''loads form to create a new task'''
    user = request.user
    if request.method == 'POST':
        new_task = TaskForm(request.POST)
        if new_task.is_valid():
            new_task.save(commit=False)
            new_task.owner = request.user.id
            new_task.save()
            return redirect("tasks")
    else:
        new_task = TaskForm()
    return render(request, "tasks/index.html", {'add_new': new_task, 'user': user, "test": 'test'})


@api_view(['POST'])
def add_task_to_DB(request, form_info):
    ''' sends form info to db as a new task'''
    new_task = Task(form_info)
    data = JSONparser().parse(new_task)
    serializer = TaskSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data)

    return JsonResponse(serializer.errors, status=400)
