#!/bin/bash

echo This is a guide only, please either edit or run appropriate commands manually
exit

# for ubuntu 14.04
# sudo apt-get update
# sudo apt-get install python-pip git libxml2-dev libxslt1-dev python-dev zlib1g-dev python-wand
# sudo apt-get install python-virtualenv virtualenvwrapper python-psycopg2 python-yaml ipython
# sudo apt-get install python-anyjson python-bs4 python-billiard python-feedparser python-html5lib
# sudo apt-get install python-httplib2 python-pystache python-crypto python-flexmock

. virtualenvwrapper.sh
# . /usr/share/virtualenvwrapper/virtualenvwrapper.sh
mkvirtualenv --system-site-packages mytardis
pip install -U pip
pip install -r requirements.txt
# for OS X, but might also need some brew requirements.
pip install -r requirements-osx.txt

mkdir -p var/store

python test.py
python mytardis.py collectstatic
# for empty databases, sync all and fake migrate, otherwise run a real migration
python mytardis.py syncdb --all
python mytardis.py migrate --fake

python mytardis.py runserver
# os x:
open http://127.0.0.1:8000/

# build docs into docs (sphinx-build inputfolder outputfolder)
sphinx-build docs docs