from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib.auth.views import LoginView
from django.shortcuts import render, redirect
from django.contrib import messages
from django.urls import reverse_lazy
from django.views.generic import CreateView


class LogIn(LoginView):
    template_name = 'Teacher_login.html'

    def post(self, request, *args, **kwargs):
        username = request.POST.get('username')
        password = request.POST.get('password')
        rememberme = request.POST.get('rememberme')

        user_obj = User.objects.filter(username=username).first()
        if user_obj is None:
            messages.success(request=request, message="Tài khoản chưa được đăng ký!!!")
            return redirect('login')
        user = authenticate(username=username, password=password)
        if user is None:
            messages.success(request=request, message="Nhập sai mật khẩu!!!")
            return redirect('login')
        login(request=request, user=user)
        if not rememberme:
            self.request.session.set_expiry(0)
            self.request.session.modified = True
        messages.success(request=request, message="Đăng Nhập thành công")
        return redirect('success')


class SignUp(CreateView):
    model = User
    fields = "__all__"
    template_name = 'register.html'
    success_url = reverse_lazy('login')

    def post(self, request, *args, **kwargs):
        try:
            password1 = request.POST.get('password1')
            password2 = request.POST.get('password2')
            username = request.POST.get('username')
            email = request.POST.get('email')
            first_name = request.POST.get('firstname')
            last_name = request.POST.get('lastname')

            if password1 != password2:
                messages.success(request, 'Mật khẩu không khớp!!!')
                return redirect('signup')

            if User.objects.filter(username=username).first():
                messages.success(request, "Tên đăng nhập đã tồn tại!!!")
                return redirect('signup')

            if User.objects.filter(email=email).first():
                messages.success(request, "Email đã được đăng ký!!!")
                return redirect('signup')

            user_obj = User.objects.create(username=username, email=email, first_name=first_name, last_name=last_name)
            user_obj.set_password(raw_password=password1)
            user_obj.save()
            return redirect('login')
        except Exception as e:
            messages.error(request, f"Lỗi {e}")
            return redirect('signup')


def success(request):
    return render(request=request, template_name='homepage.html', context={})

def user_logout(request):
    logout(request)
    return redirect(to='login')

def classroom(request):
    return render(request=request, template_name='Classrooms.html', context={})

def fee(request):
    return render(request=request, template_name='Pay_fee.html', context={})

def admission(request):
    return render(request=request, template_name='Admission_form.html', context={})

def activity(request):
    return render(request=request, template_name='Activities.html', context={})

def thucdon(request):
    return render(request=request, template_name='thucdon.html', context={})

from django.shortcuts import render, get_object_or_404
from .models import Post, Comment
from .forms import CommentForm
from django.http import HttpResponseRedirect

def post(request):
    post = get_object_or_404(Post)
    form = CommentForm()
    if request.method == "POST":
        form = CommentForm(request.Post, author=request.user, post= post)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect(request.path)
    return render( request, "Activities.html", {"post": post, "form": form})

