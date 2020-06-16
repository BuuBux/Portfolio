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
        from: '"Kamil Kras 👻" <contact@buubux.pl>', // sender address
        to: `${email}`, // list of receivers
        subject: "Formularz kontaktowy ze strony internetowej ✔", // Subject line
        html: ` <h2> Dziękuje za kontakt, postaram się odpisać najszybciej jak to możliwe </h2> `
    });

    let info2 = await transporter.sendMail({
        from: `${name} 🌹 <${mail}>`,
        to: `kamilkras.kontakt@gmail.com`,
        subject: `${name} kontaktuje się z Tobą ze strony www.buubux.pl`,
        html: `<p>${topic} | ${(phone) ? phone : 'Telefon nie został poadny'}</p>`,
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

