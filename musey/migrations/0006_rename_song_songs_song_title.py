# Generated by Django 3.2 on 2021-04-12 02:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('musey', '0005_auto_20210315_2149'),
    ]

    operations = [
        migrations.RenameField(
            model_name='songs',
            old_name='song',
            new_name='song_title',
        ),
    ]
