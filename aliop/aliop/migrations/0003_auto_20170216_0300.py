# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-02-16 03:00
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('aliop', '0002_record'),
    ]

    operations = [
        migrations.AlterField(
            model_name='record',
            name='cur',
            field=models.CharField(max_length=64),
        ),
    ]