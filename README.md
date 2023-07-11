# Pdf Management and Collaboration

## For Backend in Django Rest

## Getting started

To make it easy for you to get started with this project, here's a list of recommended next steps.

## Clone repository in your local system

```
cd your_folder_where_you_want_to_clone_it
git clone https://github.com/priyanshu-singh18/pdf-management-collaboration.git
```

## Install python 3.x (3.8.10 or above is recommended)

## Create Virtual environment

```
cd goldloancustomer/pdfmanagement_be
virtualenv venv
source venv/bin/activate
```

## Install dependency

```
pip install -r requirements.txt
```

## Setup .env file

```
 - Go to Console and copy ".env.copy" to ".env" in the same folder
 - cp /path/to/.env.copy /path/to/.env
 - Change the value as per your local setup
```

## We're using Postgres as Database allowing to leverage all features of ORM of core django).

```
- For making the database connection on local two ways are possible
- First create the local postgres database with name "pdfcollabdb"
- Edit the username and password and server in .env file
- to install postgres on local please refer the official documentation of postgres(https://www.postgresql.org/download/).
```

## Once database connection is set:

1. **Run migrations**

```
 - python manage.py makemigrations api
 - python manage.py migrate api
```

## Start Server

```
 - Go to Console and type below command
 - python manage.py runserver
```

## Sample API URL

# http://127.0.0.1:8000/

## For Frontend in React

## Getting started

To make it easy for you to get started with this project, here's a list of recommended next steps. The repository which you have cloned for backend has frontend codebase.

## For Repository

```
    Go to the main Repo which you have cloned from URL : https://github.com/priyanshu-singh18/pdf-management-collaboration.git
    cd pdfmanagement_fe
```

## Install node v18.x or above

## Install dependency

```
    npm install
```

## Run Server

```
    npm start
```

## Sample URL

## Login Page

## http://127.0.0.1:3000/

```
    Note that the following endpoints will only work after the user logs in due to token authentication and it will be fed only after login.

    http://127.0.0.1:3000/dashboard
    http://127.0.0.1:3000/pdfview

```
