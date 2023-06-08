from django.urls import path

from .views import *

urlpatterns = [
    path("", LogIn.as_view(), name="login"),
    path("success/", success, name="success"),
    path("logout/", user_logout, name="logout"),
    path("signup/", SignUp.as_view(), name="signup"),
    path("activity/", activity, name="activity"),
    path("classroom/", classroom, name="classroom"),
    path("fee/", fee, name="fee"),
    path("admission/", admission, name="admission"),
    path("post/", post, name="post"),
]
