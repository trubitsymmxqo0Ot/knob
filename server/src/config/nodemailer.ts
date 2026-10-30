import nodemailer from "nodemailer";
import { Env } from "./env.config";

export const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: Env.GMAIL,
        pass: Env.GMAIL_PASSWORD,
    }
})