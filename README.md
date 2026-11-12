# Knob - pet project, вдохновленный Jira

Минималистичный трекер задач с досками, пользователями и статусами.
Задуман как pet project, который можно стянуть себе, запустить локально и 
использовать как основу для расширения собственной задумки.

# Структура
knob/<br> 
├── client/ *фронтенд*<br>
└───┐ <br>
    ├── src/ *рабочие файлы (по fsd архитектуре)*<br>
    ├── Dockerfile *настройка docker контейнера для показа*<br>
    ├── ...others *конфигурационные файлы (что именно установлено можно прочесть в стеке)*<br>
┌───┘ <br>
├── server/ *серверная часть*<br>
└───┐ <br>
    ├── migrations/ *миграционные файлы для postgresql* <br>
    ├── src/ *рабочие файлы (по mvc)* <br>
    └───┐ <br>
        ├── auth/ *сущность пользователя, которая относится к авторизации/верификации и т.д.*<br>
        └───┐ <br>
            ├── sign-in/ *пример одной из ручек с конкретными действиями (вход в аккаунт)* <br>
            └───┐ <br>
                ├── controller.ts/ *слой, отвечающий за принятие данных и возврат готового ответа*<br>
                ├── services.ts/ *слой, отвечающий за преобразование данных и работу, бд и т.д.*<br>
                ├── types.ts/ *типы, которые относятся только к этой конкретной ручке* <br>
            ┌───┘ <br>
            ├── repository/ *действия, связанные с бд (удалить, обновить и т.п.) и проверка данных* <br>
            ├── middleware/ *middleware, относящиеся ко всем конкретным действиям внутри сущности* <br>
            ├── types/ *общие типы для множества ручек* <br>
            ├── lib/ *общие вспомогательные функции* <br>
            ├── exceptions/ *кастомные ошибки* <br>
            ├── dto/ *классы общего назначения для определения возвращаемых на клиент полец* <br>
        ┌───┘ <br>
        ├── config/ *настройки, под конкретные пакеты* <br>
        ├── meta/ *метовые ручки, которые не будут использованы на клиенте, но нужны для тестов* <br>
        ├── routes/ *роуты, по которым клиент будет обращаться на сервер (внутри файлов описан также сваггер)* <br>
        ├── index.ts/ *точка входа в приложние* <br>
    ┌───┘ <br>
    ├── Dockerfile *настройки конфигурация докера* <br>
    ├── ...others *прочие конфигурационные файлы* <br>
┌───┘ <br>
├── .env/ *тут должен храниться .env файл (он находится в .gitignore)* <br>
├── data-base.yml/ *yml файл, который поднимает только то, что нужно для разработки* <br>
├── docker-compose.yml/ *yml файл, который поднимает все части приложения (фронт, бэк, бд и т.д.)* <br>
└── README.md - *описание проекта* <br>

# Стек
- *client* - **Vite + React, Typescript, Heroui, Tanstack Router, Axios, Tailwind и т.д.**
- *server* - **Express, Typescript, Bcrypt, Cors, Cookie-parser, Dotenv, Jsonwebtoken, Nodemailer, Pg и т.д.**
- *root* - **Docker, Swagger и т.д.**

# Ключевой функционал
-   Взаимодействие с аккаунтом (регистрация, удаление, вход, выход и т.д.)
-   Активация аккаунта
-   Поднятие контейнера с полным набором (фронт, бэк, бд и т.д.), либо облегченный вариант для разработки
-   Swagger документация

#Требования для работы с проектом
-   Node.js 20+
-   pnpm 10+
-   Docker Desktop

**!В корне проекта обязательно нужно будет создать .env и заполнить его следующими заддными:**
```env
#Backend data
VITE_BACKEND_PORT=4000
VITE_APP_URL='http://localhost'

#Backend data - postgres
POSTGRES_PORT=4321
POSTGRES_PASSWORD=your_password
POSTGRES_DB=your_db_name
POSTGRES_USER=your_db_username
DATABASE_URL=postgresql://your_db_username:your_password@localhost:4321/your_db_name
JWT_ACCESS_SECRET=your_access_secret_key
JWT_REFRESH_SCRET=your_refresh_secret_key

#Backend data - minio
MINIO_ROOT_USER=your_minio_username
MINIO_ROOT_PASSWORD=your_minio_password
MINIO_PORT=9000

#Backend data - nodemailer
GMAIL_PASSWORD=16_symbols_pass
GMAIL=your_gmail_account_login
```

**Для отправки писем по почте используется пакет nodemailer, чтобы успешно использовать этот функционал,**<br>
**нужно включить в аккаунта, от лица которого будут отправляться письма, 2-х этапную аутентификацию, а также сгенерировать пароль.**

# Запуск проекта
## Не для разработки

*Из корня проекта:*
```bash
docker compose up -d --build
```

*Что поднимется:*
-   db - Postgresql
-   server - Express на хосте
-   Client vite dev-сервер на localhost:3000 (внутри - 5173)
**Порты для поднятие будут взяты на основе .env файла**

*Остановить контейнеры:*
```bash
docker compose down -v
```

## Для разработки
*server:*

**Нужно поднять легковесный docker compose yml и установить зависимости по команде:**
```bash
/*Находясь в корне проекта*/

docker compose -f data-base.yml up -d

pnpm install
```

**Перейдите в папку server:**
```bash
cd server
```

**Установите локальные зависимости для сервера и запустите его:**
```bash
pnpm install
pnpm run dev
```

**Чтобы работать с базой данных, нужно создать файл миграции по команде:**
```bash
pnpm run migrate -- create MIGRATE_NAME
```
**Далее, внутри файла внутри функций up/down описать изменения, исходя из документации pg pool.**
**После чего внести изменения с помощью команды:**
```bash
pnpm run migrate up
```

**Теперь запустите prisma studio для отслеживания изменений в бд:**
```bash
pnpm studio
```

**Посмотреть какие есть ручки можно не только в коде, но и в swagger по пути:**
```bash
{{env.VITE_APP_URL}}:{{env.VITE_BACKEND_PORT}}/docs
```
**Стандартно**
```bash
http://localhost:4000/docs
```

*client*

**Перейдите в client файл и установите зависимости:**
```bash
cd /client
/* Или, если вы внутри server */
cd ../client

pnpm install
```
