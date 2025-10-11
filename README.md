# film-react-nest

Многоуровневое приложение для онлайн-афиши кинотеатра: фронтенд на React + Vite, бэкенд на NestJS, база данных PostgreSQL, инфраструктура через Docker Compose.

## Состав репозитория

- `frontend/` — клиентская часть (React, Vite)
- `backend/` — серверная часть (NestJS)
- `nginx/` — конфигурация nginx для проксирования
- `docker-compose.yml` — запуск всех сервисов
- `backend/test/` — SQL-скрипты для инициализации БД

## Быстрый старт

1. Установите Docker и Docker Compose v2.
2. Запустите все сервисы:
	 ```bash
	 docker compose up -d --build
	 ```
3. Приложение будет доступно на https://film.stan99.nomorepartiessbs.ru/

P.S. При первом запуске скорее всего не будет сертификата и nginx не поднимется, пока он не появится. Надо пошаманить с конфигурацией nginx и запуском certbot (сервис присутствует). Команда для запуска certbot такая: docker compose run --rm certbot certonly --webroot --webroot-path /var/www/certbot/ -d film.stan99.nomorepartiessbs.ru

## Сервисы

- **frontend** — React SPA, порты 80, 443 (через nginx)
- **backend** — NestJS API, порт 3000 (внутри сети)
- **database** — PostgreSQL 16, порт 5432
- **nginx** — проксирование и статика

## Инициализация БД

При первом запуске контейнера PostgreSQL автоматически выполняются скрипты:
- `01_create_tables.sql`
- `02_prac.films.sql`
- `03_prac.schedules.sql`

## Проверка работы

- Проверить доступность nginx:
	```bash
	curl -v https://film.stan99.nomorepartiessbs.ru/
	```

## Разработка

- Фронтенд: `cd frontend && npm install && npm run dev`
- Бэкенд: `cd backend && npm install && npm run start:dev`

## Документация

- [NestJS](https://docs.nestjs.com/)
- [React](https://react.dev/)
- [Docker Compose](https://docs.docker.com/compose/)
