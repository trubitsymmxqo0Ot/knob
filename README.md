# Knob — легковесный клон Jira

Учебный проект: минималистичный трекер задач с досками, задачами и статусами.
Задуман как пет-проект — можно стянуть себе, запустить локально и использовать как основу для экспериментов.

## Стек

- **client** — Vite + React (TypeScript)
- **server** — Node.js + Express (TypeScript, запуск через `tsx`)
- **db** — PostgreSQL 16 (Alpine)
- **infra** — Docker Compose (db + server + client в контейнерах)

## Структура
knob/<br>
├── client/ # фронтенд (Vite + React)<br>
├── server/ # бэкенд (Node.js + Express)<br>
└── docker-compose.yml<br>

## Требования
- Node.js 20+ (рекомендуется 24.x)
- pnpm (рекомендуется 10.x)
- Docker Desktop (для запуска через Compose)

## Переменные окружения

В корне проекта создайте файл `.env`:

```env
#Backend data
BACKEND_PORT=4000

#Backend data - postgres
POSTGRES_PORT=4321
POSTGRES_PASSWORD=user_password
POSTGRES_DB=user_db
POSTGRES_USER=user_name
```
# Запуск через docker compose 

Из корня проекта:

```bash
docker compose up -d --build
```

## Что поднимется:

-   db - PostgreSQL на хосте localhost:${POSTGRES_PORT} (или localhost:4321, если env не менялся, внутренняя сеть - 5432)
-   server - Express на хосте localhost:${BACKEND_PORT} (или localhost:4000, если env не менялся, внутри - 4000)
-   client - Vite dev-сервер на localhost:3000 (внутри - 5173)

*Сервер проверяется внутри docker compose по пути: http//:localhost:${BACKEND_PORT}/health*

Остановить:

```bash
docker compose down -v
```

# Запуск для разработки

*Перед установкой зависимостей рекомендуется поставить pnpm пакет*
```bash
npm -g pnpm
```

## server

**Поднимите базу данных через отдельный файл docker compose**

*находясь в корне проекта*
```bash
docker compose -f data-base.yml up -d
```

**Установите зависимости**

```bash
cd sever
pnpm install
pnpm run dev
```
*или*
```bash
cd server
npm install
npm run dev
```

**nodemon запустит dev-server по пути localhost:{ВАШ_ПОРТ} (стандартно localhsot:4000)**

**Запустите prisma studio для отслеживания изменений в бд**<br>
*Важно: данные для подключения prisma studio берутся из .env, заполните их данными*

```bash
pnpm studio
```

## client

Запустите dev среду:

```bash
cd client
pnpm install
pnpm run dev
```
*или*
```bash
cd client
npm install
npm run dev
```

**Vite запустит dev-server по стандартному пути: localhost:5173**