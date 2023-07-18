#!/usr/bin/env bash
# exit on error
pip install -r requirements.txt

set -o errexit

poetry install
pip install --upgrade pippip install --force-reinstall -U setuptools
python manage.py makemigrations
python manage.py migrate