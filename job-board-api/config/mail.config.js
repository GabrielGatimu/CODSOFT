mailConfig = {
    HOST: "smtp.gmail.com",
    PORT: 587,
    MAIL_USER: process.env['EMAIL_SENDER'],
    MAIL_PASSWORD: process.env['EMAIL_PASSWORD']
}

module.exports = mailConfig