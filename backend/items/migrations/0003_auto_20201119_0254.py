# Generated by Django 3.1 on 2020-11-18 22:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('items', '0002_siteuser_added'),
    ]

    operations = [
        migrations.AlterField(
            model_name='siteuser',
            name='added',
            field=models.TextField(default='{}', null=True),
        ),
    ]
