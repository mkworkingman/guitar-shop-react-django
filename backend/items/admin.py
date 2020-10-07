from django.contrib import admin
from .models import Instrument

admin.site.site_header = "Guitar Shop Admin Panel"
admin.site.register(Instrument)