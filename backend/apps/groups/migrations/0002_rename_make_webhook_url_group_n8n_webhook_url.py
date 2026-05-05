# Generated migration: rename make_webhook_url → n8n_webhook_url

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('groups', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='group',
            old_name='make_webhook_url',
            new_name='n8n_webhook_url',
        ),
    ]
