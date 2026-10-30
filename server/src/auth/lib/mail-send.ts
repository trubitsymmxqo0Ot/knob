import path from "path";
import { Env } from "../../config/env.config";
import { transporter } from "../../config/nodemailer";
import fs from 'fs';
import { ApiError } from "../exceptions/api-error";

class MailSend {
    private verifyMailer() {
        let isActive = false;
        transporter.verify((error) => {
            if (error) {
                console.error('Connecting error', error)
            } else {
                console.log('Success connect!');
                isActive = true;
            }
        })
        return isActive;
    }

    async send(mail: string, id: string) {
        const isVerify = this.verifyMailer();
        if (isVerify) throw ApiError.BadRequest('Отправить подтверждение для аккаунта невозможно');

        let templatePath = path.join(__dirname, './message-template/activate.html')
        let html = fs.readFileSync(templatePath, 'utf-8');
        const activateLink = `${Env.APP_URL}:${Env.BACKEND_PORT}/user/activate/${id}`;
        html = html
        .replace(/{{name}}/g, mail.split('@')[0])
        .replace(/{{activationLink}}/g, activateLink);

        const info = await transporter.sendMail({
            from: Env.GMAIL,
            to: mail,
            subject: 'Активация аккаунта на knob',
            html
        })
        console.log(info);
    }
}

export const mailSend = new MailSend();