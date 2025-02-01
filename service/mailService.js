const nodemailer = require("nodemailer");
const BaseError = require("../error/errorHandler");

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({

            service: "gmail",
            auth: {
                user: process.env.MY_GMAIL,
                pass: process.env.PASS_KEY
            }
        })
    }
    async sendMail(to, code) {
        try {

            await this.transporter.sendMail({
                from: process.env.MY_GMAIL,
                to: to,
                subject: "email aktivlashtrish",
                text: "",
                html: `<p> verify code <b> ${code} </b> </p>`,
            })
        } catch (error) {
            console.log(error);
            return BaseError.InternalError(error.message)
        }
    }
}
module.exports = new MailService()