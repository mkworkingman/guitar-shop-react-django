from django.contrib import admin
from django.urls import path
from graphene_django.views import GraphQLView
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import TemplateView
from django.conf.urls.static import static
from django.conf import settings
from django.shortcuts import render

def index(request):
    return render(request, "build/index.html")

urlpatterns = [
    path('admin/', admin.site.urls),
    path("graphql", csrf_exempt(GraphQLView.as_view(graphiql=True))),
    path("", index, name="index")
    # path("", TemplateView.as_view(template_name="index.html"))
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
