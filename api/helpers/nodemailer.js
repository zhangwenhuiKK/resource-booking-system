const nodemailer = require('nodemailer');

const sendMail= async ({subject, email, content }) => {
    const transporter = await nodemailer.createTransport({
        service: 'QQ', 
        secureConnection: true, // SSL安全链接
        auth: {
            //发送者的账户密码
            user: process.env.EMAIL_USER, //账户
            pass: process.env.EMAIL_PASS, //smtp授权码，到邮箱设置下获取
        },
    });
   
    const info =await transporter.sendMail({
        from: process.env.EMIAL_SENDER, // 发送者昵称和地址
        to: email, // 接收者的邮箱地址
        subject: subject, // 邮件主题
        text: content,
    });
    //console.log('sending email',info)
};

module.exports = sendMail
