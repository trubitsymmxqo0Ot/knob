import { body } from "express-validator";

export const emailValidator = () =>
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email обязателен')
        .bail()
        .normalizeEmail()
        .isEmail()
        .withMessage('Некорректный email');

export const passwordValidator = () =>
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Пароль обязателен')
        .bail()
        .isLength({ min: 8 })
        .withMessage('Минимальная длинна пароля - 8 символов');

export const nameValidator = () =>
    body('name')
        .trim()
        .notEmpty()
        .withMessage("Имя обязательно")
        .bail()
        .isLength({ min: 3 })
        .withMessage('Минимальная длинна имени - 3 символа'); 