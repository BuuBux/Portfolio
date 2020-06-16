require('dotenv').config();
const nodemailer = require('nodemailer');

async function mail({ name, email, topic, phone }) {

    let transporter =  nodemailer.createTransport({
        host: "poczta.ct8.pl",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL, // generated ethereal user
            pass: process.env.PASSWORD // generated ethereal password
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: `"Kamil Kras 👻" <${process.env.MY_MAIL}>`, // sender address
        to: `${email}`, // list of receivers
        subject: "Formularz kontaktowy ze strony internetowej ✔", // Subject line
        html: ` <h2> Dziękuje za kontakt, postaram się odpisać najszybciej jak to możliwe </h2> `
    });

    let info2 = await transporter.sendMail({
        from: `${name} 🌹 <${process.env.MY_MAIL}>`,
        to: `${process.env.MAIL_CARBON_COPY}, ${process.env.MY_MAIL}`,
        subject: `${name} kontaktuje się z Tobą ze strony www.buubux.pl`,
        html: `
            <h2> Mail kontaktowy - <a href="mailto:${email}"> ${email} </a> </h2> <br />
            <h4> ${topic} </h4> <br />
            <p> ${(phone) ? phone : 'Telefon nie został podany'} </p>   
        `,
    })

    console.log("Message sent: %s", info.messageId);
    console.log('Message sent: %s', info2.messageId);
}



exports.mailReceived = (req, res, next) => {
    mail(req.body)
        .then(() => {
            const response = { status: 200, body: req.body };
            res.json(response);
        })
        .catch((err) => {
            next(err);
        })
};
