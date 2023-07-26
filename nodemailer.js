const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    secure:true,
    port: 465,
    auth: {
        user: 'emmanuellopezleyva@gmail.com',
        pass: 'crrkojuvvbpfoxic' // variable de entorno 
    }
});

// async..await is not allowed in global scope, must use a wrapper
async function sendMail() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'emmanuellopezleyva@gmail.com', // sender address
    to: "lopez.leyva.c.emmanuel@gmail.com", // list of receivers
    subject: "Correo de prueva", // Subject line
    text: "Hello world", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>


}

sendMail();
