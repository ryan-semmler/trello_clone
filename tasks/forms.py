from django.forms import ModelForm
from .models import Task

#create new task via ModelForm

class TaskForm(ModelForm):
    class Meta:
        model = Task
        fields = ['title', 'status', 'priority']
