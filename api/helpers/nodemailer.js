const nodemailer = require('nodemailer');

// create a transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: 'smtp.example.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'username', // generated ethereal user
        pass: 'password' // generated ethereal password
    }
});

// send mail with defined transport object
const sendMail = ()=>transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: 'bar@example.com, baz@example.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: '<b>Hello world?</b>' // html body
});
module.exports = sendMail