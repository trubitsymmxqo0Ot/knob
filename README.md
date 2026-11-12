# Knob — pet project, вдохновлённый Jira

Минималистичный трекер задач с досками, пользователями и статусами.  
Можно клонировать, поднять локально и развивать под свои задачи.

## Структура

Дерево ниже — обычный блок кода: отображается ровно, без `<br>` и съезжающих отступов в Git/GitHub.

```
knob/
├── client/                              # фронтенд
│   ├── src/                             # FSD: app, pages, widgets, features, entities, shared
│   ├── Dockerfile                       # образ для Docker Compose
│   └── …                                # vite.config, package.json и т.д.
│
├── server/                              # бэкенд
│   ├── migrations/                      # миграции PostgreSQL (node-pg-migrate)
│   ├── src/
│   │   ├── auth/                        # пользователь: auth, JWT, почта
│   │   │   ├── sign-in/                 # пример ручки
│   │   │   │   ├── controller.ts        # приём запроса и ответ клиенту
│   │   │   │   ├── services.ts          # бизнес-логика, работа с БД
│   │   │   │   └── type.ts              # типы этой ручки
│   │   │   ├── sign-up/, refresh/, …    # остальные auth-ручки — та же схема
│   │   │   ├── repository/              # save, find, update, remove
│   │   │   ├── middlewares/             # auth, error-middleware
│   │   │   ├── types/                   # общие типы auth
│   │   │   ├── lib/                     # cookies, mail, helpers
│   │   │   ├── exceptions/              # ApiError и др.
│   │   │   └── dto/                     # что отдаём на клиент
│   │   ├── config/                      # pool, env, swagger, validator
│   │   ├── meta/                        # health, clear (не для клиента)
│   │   ├── routes/                      # sign-routes, meta (+ Swagger в комментариях)
│   │   └── index.ts                     # точка входа Express
│   ├── Dockerfile
│   └── …
│
├── .env                                 # в корне, в .gitignore
├── data-base.yml                        # dev: в основном PostgreSQL
├── docker-compose.yml                   # полный стек: db + server + client
└── README.md
```

## Стек

| Часть | Технологии |
|--------|------------|
| **client** | Vite, React, TypeScript, HeroUI, TanStack Router, React Query, Axios, Tailwind |
| **server** | Express, TypeScript, bcrypt, cors, cookie-parser, JWT, nodemailer, `pg`, node-pg-migrate |
| **инфра** | Docker, Swagger (`/docs`) |

## Функционал

- Регистрация, вход, выход, refresh-сессия, удаление аккаунта
- Активация аккаунта по e-mail (nodemailer)
- Docker: полный compose или облегчённый вариант для разработки
- Документация API: Swagger UI

## Требования

- Node.js 20+
- pnpm 10+ (в проекте зафиксирован `pnpm@12.14.0`)
- Docker Desktop (для PostgreSQL в контейнере)

## Переменные окружения

В **корне** репозитория создайте файл `.env` (шаблон):

```env
# Backend
VITE_BACKEND_PORT=4000
VITE_APP_URL=http://localhost

# PostgreSQL
POSTGRES_PORT=4321
POSTGRES_PASSWORD=your_password
POSTGRES_DB=your_db_name
POSTGRES_USER=your_db_username
DATABASE_URL=postgresql://your_db_username:your_password@localhost:4321/your_db_name

JWT_ACCESS_SECRET=your_access_secret_key
JWT_REFRESH_SCRET=your_refresh_secret_key

# Minio (зарезервировано под будущее)
MINIO_ROOT_USER=your_minio_username
MINIO_ROOT_PASSWORD=your_minio_password
MINIO_PORT=9000

# Nodemailer (Gmail)
GMAIL=your_gmail_account_login
GMAIL_PASSWORD=your_16_char_app_password
```

Для почты через Gmail: включите двухфакторную аутентификацию и создайте **пароль приложения** (не обычный пароль от аккаунта).

> **Порт API:** клиент ходит на `VITE_APP_URL:VITE_BACKEND_PORT`. Убедитесь, что на этом порту слушает именно Express из `server`, а не другой локальный сервис.

## Запуск

### Production-like (всё в Docker)

Из **корня** проекта:

```bash
docker compose up -d --build
```

Поднимается:

- **db** — PostgreSQL
- **server** — Express (порт с хоста берётся из `VITE_BACKEND_PORT`)
- **client** — Vite в контейнере, снаружи обычно `http://localhost:3000` (внутри 5173)

Остановка с удалением volumes:

```bash
docker compose down -v
```

### Локальная разработка

#### 1. База данных

Из **корня**:

```bash
docker compose -f data-base.yml up -d
```

#### 2. Backend (`server/`)

```bash
cd server
pnpm install
pnpm run dev
```

Миграции (только из `server/`):

```bash
# 1. Создать файл
pnpm run migrate -- create MIGRATE_NAME

# 2. Заполнить up/down в server/migrations/*.ts
# 3. Применить
pnpm run migrate up
```

Сначала опишите изменения в файле миграции, **потом** выполняйте `migrate up`. Повторно уже применённая миграция не перезапустится — для правок нужна новая миграция или откат (`migrate down`).

Prisma Studio (просмотр данных, не замена миграций):

```bash
pnpm studio
```

Swagger:

- [http://localhost:4000/docs](http://localhost:4000/docs) (если `VITE_BACKEND_PORT=4000`)

#### 3. Frontend (`client/`)

```bash
cd client
pnpm install
pnpm run dev
```

Дев-сервер: [http://localhost:5173](http://localhost:5173) (см. вывод Vite).

Фронт читает `VITE_*` из корневого `.env` (`envDir` в `vite.config.ts`).
