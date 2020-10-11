from django.contrib import admin
from django.contrib.auth.models import Group
from .models import Instrument

admin.site.site_header = "Guitar Shop Admin Panel"
admin.site.register(Instrument)
admin.site.unregister(Group)
