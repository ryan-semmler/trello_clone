from django.forms import ModelForm
from .models import Task
from django.contrib.auth.models import User


class TaskForm(ModelForm):
    class Meta:
        model = Task
        fields = ['title', 'status', 'priority']


class UserForm(ModelForm):
    class Meta:
        model = User
        fields = ['username', 'password']


# class UserProfileForm(ModelForm):
#     class Meta:
#         model = UserProfile
#         exclude = ['user']
