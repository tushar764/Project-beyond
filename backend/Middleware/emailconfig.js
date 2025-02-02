const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "projectmailqw1@gmail.com",
    pass: "hpxu ufng czcz dmws",
  },
});

const sendMail = async () => {
  try {
    const info = await transporter.sendMail({
      from: '"TusharSend 👻" <projectmailqw1@gmail.com>', // sender address
      to: "saintushar148@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });
    console.log(info);
  } catch (error) {
    console.log(error);
  }
};

// Export the transporter and sendMail function using CommonJS syntax
module.exports = { transporter, sendMail };
