const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    // host: "smtp.gmail.com",
    service: 'gmail',
    // secure: false,
    port: 465,
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD
    },
    // tls: {
    //     rejectUnauthorized: false
    // },
    from: process.env.GMAIL_USER
});


const sendMail = async ({ id, email, username }) => {
    let isSuccess;
    try {
        const emailToken = jwt.sign({ id, email, username }, process.env.JWT_EMAIL_SECRET, { expiresIn: '10m' });
        const url = `http://localhost:${process.env.PORT}/auth-user/verify-email/${emailToken}`;
        const today = new Date();
        const curHr = today.getHours();
        let greetingsText;
        if (curHr >= 0 && curHr < 6) {
            greetingsText = 'What are you doing that early?';
        } else if (curHr >= 6 && curHr < 12) {
            greetingsText = 'Good Morning';
        } else if (curHr >= 12 && curHr < 17) {
            greetingsText = 'Good Afternoon';
        } else {
            greetingsText = 'Good Evening';
        }
        await transporter.sendMail({
            from: process.env.GMAIL_USER,
            to: email,
            template: 'email',
            subject: 'Welcome :)',
            text: "Hello. This email is for your email verification.",
            cc: ['ramchan007nrc@gmail.com'],
            // bcc: 'jayashreeg0896@gmail.com',
            context: {
                username,
                url,
                greetingsText,
            },
        })
        isSuccess = true;
    } catch (error) {
        isSuccess = error;
        console.log('=================send email error:============', error)
    }
    return isSuccess;
}

module.exports = {
    transporter, sendMail
}