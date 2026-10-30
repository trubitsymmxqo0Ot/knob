import { Router } from 'express';
import { signUpController } from '../auth/sign-up/controller';
import { signIngController } from '../auth/sign-in/controller';
import { logoutController } from '../auth/logout/controller';
import { deleteController } from '../auth/delete/controller';
import { activeController } from '../auth/active/controller';
import { emailValidator, nameValidator, passwordValidator } from '../config/validator';
import { authMiddleware } from '../auth/middlewares/auth-middleware';
import { refreshController } from '../auth/refresh/controller';

const userRoutes = Router();

/**
 * @swagger
 * /user/sign-up:
 *   post:
 *     summary: Регистрация нового пользователя
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - name
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               name:
 *                 type: string
 *                 minLength: 3
 *                 example: Иван Иванов
 *               password:
 *                 type: string
 *                 minLength: 8
 *                 example: "securePassword123"
 *     responses:
 *       200:
 *         description: Пользователь успешно создан. В ответе приходят данные пользователя, а в cookies устанавливаются токены (accessToken и refreshToken).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: Иван Иванов
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: user@example.com
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2026-10-30T12:00:00.000Z"
 *       400:
 *         description: Некорректные данные (например, не прошел валидацию или пользователь уже существует)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Неудалось создать пользователя"
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *       500:
 *         description: Внутренняя ошибка сервера
 */

userRoutes.post(
    '/sign-up',
    emailValidator(),
    nameValidator(),
    passwordValidator(),
    signUpController.signUp
);

/**
 * @swagger
 * /user/sign-in:
 *   post:
 *     summary: Вход в аккаунт
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 minLength: 8
 *                 example: "securePassword123"
 *     responses:
 *       200:
 *         description: Успешный вход. В ответе приходят данные пользователя, а в cookies устанавливаются токены (accessToken и refreshToken).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: Иван Иванов
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: user@example.com
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2026-10-30T12:00:00.000Z"
 *       400:
 *         description: Неверный email или пароль
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ошибка при попытке войти в аккаунт"
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *       500:
 *         description: Внутренняя ошибка сервера
 */

userRoutes.post(
    '/sign-in',
    emailValidator(),
    nameValidator(),
    passwordValidator(),
    signIngController.signIn
);

/**
 * @swagger
 * /user/logout:
 *   post:
 *     summary: Выход из аккаунта
 *     description: Удаляет refresh-токен из базы данных и очищает куки (accessToken и refreshToken).
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: [] # Ссылка на схему безопасности, которую нужно определить в swagger.ts
 *     responses:
 *       200:
 *         description: Успешный выход (куки очищены)
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: ""
 *       401:
 *         description: Пользователь не авторизован (отсутствует или невалиден refresh-токен)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Пользователь не авторизован"
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *       400:
 *         description: Не удалось удалить токен (например, ошибка БД)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Не удалось удалить токен"
 *       500:
 *         description: Внутренняя ошибка сервера
 */

userRoutes.post(
    '/logout',
    authMiddleware,
    logoutController.logout
);

/**
 * @swagger
 * /user/delete:
 *   post:
 *     summary: Удаление аккаунта
 *     description: Удаляет пользователя и связанные с ним токены из базы данных, а также очищает куки (accessToken и refreshToken).
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Аккаунт успешно удален
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Deleted success"
 *       400:
 *         description: Ошибка при попытке удалить аккаунт (например, не удалось удалить данные из БД)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ошибка при попытке удалить аккаунт"
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *       401:
 *         description: Пользователь не авторизован (отсутствует или невалиден refresh-токен)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Пользователь не авторизован"
 *       500:
 *         description: Внутренняя ошибка сервера
 */

userRoutes.post(
    '/delete',
    authMiddleware,
    deleteController.delete
);

/**
 * @swagger
 * /user/activate/{activate}:
 *   post:
 *     summary: Активация аккаунта
 *     description: Активирует аккаунт пользователя по ссылке из письма.
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: activate
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: Уникальный идентификатор (или токен) для активации аккаунта
 *         example: "550e8400-e29b-41d4-a716-446655440000"
 *     responses:
 *       200:
 *         description: Аккаунт успешно активирован
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "user has been actived"
 *       400:
 *         description: Неизвестная ошибка при активации (например, неверный токен активации)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Неизвестная ошибка при попытке активировать аккаунт"
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *       401:
 *         description: Пользователь не авторизован (отсутствует refresh-токен)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Пользователь не авторизован"
 *       500:
 *         description: Внутренняя ошибка сервера
 */

userRoutes.post(
    '/activate/:activate',
    authMiddleware,
    activeController.active
);

/**
 * @swagger
 * /user/refresh:
 *   post:
 *     summary: Обновление токенов доступа
 *     description: Проверяет refresh-токен из куки, генерирует новую пару токенов (accessToken и refreshToken) и возвращает данные пользователя.
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Токены успешно обновлены. Новые токены устанавливаются в cookies, в теле ответа приходят данные пользователя.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: Иван Иванов
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: user@example.com
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2026-10-30T12:00:00.000Z"
 *       401:
 *         description: Пользователь не авторизован (отсутствует или невалиден refresh-токен)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Пользователь не авторизован"
 *       500:
 *         description: Внутренняя ошибка сервера
 */

userRoutes.post(
    '/refresh',
    authMiddleware,
    refreshController.refresh
)

export default userRoutes;