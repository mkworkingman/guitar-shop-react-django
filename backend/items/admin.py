from django.contrib import admin
from django.contrib.auth.models import Group, User
from .models import Instrument, Siteuser

admin.site.site_header = "Guitar Shop Admin Panel"
admin.site.register(Instrument)
admin.site.register(Siteuser)
admin.site.unregister(User)
admin.site.unregister(Group)
