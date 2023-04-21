const nodemailer = require("nodemailer");

/* Post: http://localhost:8080/api/registerMail
    {
        "username": "example123",
        "email": "jivesh@gmail.com",
        "subject": "jivesh@gmail.com",
        "text": "jivesh@gmail.com",
    }
*/
async function registerMail(req, res, next) {
    try {
        const { username, email, text, subject } = req.body;

        // Creating Transporter for sending mail
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_EMAIL, // generated ethereal user
                pass: process.env.MAIL_PASSWORD, // generated ethereal password
            },
        });

        // Sending mail
        const info = await transporter.sendMail({
            from: process.env.MAIL_EMAIL, // sender address
            to: email, // list of receivers
            subject: subject || "OTP for Reset Password", // Subject line
            text: text || `Dear ${username || 'User'}, Your OTP is ${req.app.locals.OTP}. Enter the OTP to reset your password.`, // plain text body
        });

        // Sending Response
        res.send({
            status: 'Ok',
            message: `Mail sent to ${email}`,
            mailId: info.messageId
        })
    } catch (error) {
        next(error);
    }
}

module.exports = { registerMail }