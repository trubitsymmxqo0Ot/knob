import { Router } from 'express';
import { metaController } from '../meta/drop/controller';

const meta = Router()

/**
 * @swagger
 * /meta/health:
 *   get:
 *     summary: Проверка работоспособности сервера
 *     description: Возвращает статус 200 и строку "ok", если сервер запущен и готов принимать запросы. Используется для healthcheck в Docker.
 *     tags: [Meta]
 *     responses:
 *       200:
 *         description: Сервер работает
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "ok"
 */

meta.get('/health', (req, res) => {
    res.status(200).send('ok');
})

/**
 * @swagger
 * /meta/clear:
 *   post:
 *     summary: Очистка базы данных
 *     description: Полностью удаляет все данные из таблиц (TRUNCATE). Использовать с осторожностью!
 *     tags: [Meta]
 *     responses:
 *       200:
 *         description: База данных успешно очищена
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "All db was clear"
 *       400:
 *         description: Ошибка при попытке очистки БД (например, проблема с внешними ключами)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ошибка при попытке удалить данные из бд"
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *       500:
 *         description: Внутренняя ошибка сервера
 */

meta.post('/drop', (req, res) => metaController.clearDb(req, res))

export default meta;