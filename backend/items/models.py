from django.db import models

ORIENT = (
    ('right', 'Right'),
    ('left', 'Left')
)

INSTRUMENT_TYPES = (
    ('acoustic', 'Acoustic'),
    ('electric', 'Electric'),
    ('electroacoustic', 'Electro Acoustic'),
    ('bass', 'Bass'),
    ('acousticbass', 'Acoustic Bass'),
    ('ukulele', 'Ukulele')
)

class Siteuser(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=22)
    email = models.EmailField(max_length=250)
    password = models.CharField(max_length=250)

    def __str__(self):
        return self.username

class Instrument(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    inst_type = models.CharField(choices=INSTRUMENT_TYPES, max_length=16, default='acoustic')
    image = models.ImageField(upload_to='uploads', blank=True, default=None)
    strings = models.IntegerField()
    frets = models.IntegerField()
    brand = models.CharField(max_length=100)
    orientation = models.CharField(choices=ORIENT, max_length=5, default='right')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    discount = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    def __str__(self):
        return self.name
