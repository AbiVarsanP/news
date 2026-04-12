# Newspaper (Django News App)

A modern Django news/blog application with authentication, article publishing, comments, and responsive UI styling.

## Features

- Custom user model and authentication
- Sign up, login, logout, password change/reset flows
- Article CRUD (create, read, update, delete)
- Comment support on articles
- Responsive modern UI with custom CSS/JS
- Static file handling with WhiteNoise

## Tech Stack

- Python 3.11+
- Django 5
- crispy-forms + crispy-bootstrap5
- WhiteNoise
- SQLite (default local workflow) or PostgreSQL via `DATABASE_URL`

## Project Structure

- `accounts/` : custom user model, auth forms/views/urls
- `articles/` : article and comment models, forms, views, urls
- `pages/` : basic pages (home)
- `templates/` : shared and app templates
- `static/` : custom CSS, JS, images
- `django_project/` : settings, root urls, wsgi/asgi

## Prerequisites

- Python installed
- pip installed

## Quick Start

1. Create and activate virtual environment

```bash
python -m venv .venv
.venv\Scripts\activate
```

2. Install dependencies

```bash
pip install -r requirements.txt
```

3. Create environment file `.env` in project root

```env
SECRET_KEY=change-this-secret-key
DEBUG=True
DATABASE_URL=sqlite:///db.sqlite3
```

4. Run migrations

```bash
python manage.py migrate
```

5. Create admin user (optional)

```bash
python manage.py createsuperuser
```

6. Start server

```bash
python manage.py runserver
```

Open: `http://127.0.0.1:8000/`

## Common Commands

```bash
python manage.py makemigrations
python manage.py migrate
python manage.py test
python manage.py collectstatic
```

## Deployment Notes

- `ALLOWED_HOSTS` and `CSRF_TRUSTED_ORIGINS` should be set for your domain.
- WhiteNoise is configured for static file serving.
- For production, set `DEBUG=False` and provide a strong `SECRET_KEY`.

## Troubleshooting

- If styles are missing, run:

```bash
python manage.py collectstatic
```

- If DB settings fail, verify `.env` and `DATABASE_URL`.

## License

For learning/personal project usage unless you define a separate license.
