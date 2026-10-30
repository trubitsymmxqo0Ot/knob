import { body } from "express-validator";
import { Request } from "express";

export const emailValidator = () =>
    body('email')
        .isEmail()
        .notEmpty()
        .normalizeEmail()
        .withMessage('Некорректный email');

export const passwordValidator = () =>
    body('password')
        .isLength({ min: 8 })
        .notEmpty()
        .withMessage('Пароль минимум в 8 символов');

export const nameValidator = () =>
    body('name')
        .trim()
        .notEmpty()
        .withMessage("Имя обязательно")
        .isLength({ min: 3 })
        .withMessage('Минимальная число символов - 3'); 