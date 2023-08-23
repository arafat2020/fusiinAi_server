
import { Transporter, createTransport, } from 'nodemailer'
import dotenv from 'dotenv';
import Mail from 'nodemailer/lib/mailer';
import { Response } from 'express';

dotenv.config()

export class Mailer {
    transport: Transporter
    mailOptionsTXT: Mail.Options
    res: Response
    info: {
        err: boolean,
        info: any
    }
    constructor(
        email: string,
        subject: string,
        text: string,
        res: Response,
        private entityID: string
    ) {
        this.transport = createTransport({
            service: 'gmail',
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            }
        })
        this.mailOptionsTXT = {
            from: process.env.USER,
            to: email ? email : 'arafatmannan9@gmail.com',
            subject: subject,
            text: text,
        }
        this.info = {
            err: false,
            info: 'idle'
        }
        this.res = res
    }
    async snedMail() {
        await this.transport.sendMail(this.mailOptionsTXT, (err, data) => {
            if (err) {
                this.res.status(500).send(err)
            } else {
                this.res.send({
                    entityID: this.entityID,
                    data
                })
            }
        })
    }
}