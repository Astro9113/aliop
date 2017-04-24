from __future__ import unicode_literals

from django.db import models

# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=50)
    email = models.CharField(max_length=50)
    tel = models.CharField(max_length=50)

    def __unicode__(self):
        return self.username

class Record(models.Model):
    cur = models.CharField(max_length=64)
    username = models.CharField(max_length=64)
    method = models.CharField(max_length=64)
    url = models.CharField(max_length=128)