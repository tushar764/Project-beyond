const nodemailer = require("nodemailer");

// Email configuration
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for port 587
  auth: {
    user: "projectmailqw1@gmail.com",
    pass: "hpxu ufng czcz dmws", // Use an environment variable in production
  },
});

// Welcome email function
const WelcomeEmail = async (email, verificationCode) => {
  try {
    const response = await transporter.sendMail({
      from: '"Tushar 👻" <projectmailqw1@gmail.com>',
      to: email,
      subject: "Welcome to Beyond",
      text: `Your verification code is: ${verificationCode}`,
      html: `<p>Welcome to Beyond! Please use the code <strong>${verificationCode}</strong> to verify your email.</p>`, // Fixed this line
    });

    console.log("Verification email sent successfully:", response.messageId);
  } catch (error) {
    console.error("Failed to send email:", error);
  }
};

// Send verification code function
const SendVerificationCode = async (email, verificationCode) => {
  try {
    const response = await transporter.sendMail({
      from: '"Tushar 👻" <projectmailqw1@gmail.com>',
      to: email,
      subject: "Verify Your Email",
      text: `Your verification code is: ${verificationCode}`,
      html: `<p>Your verification code is: <strong>${verificationCode}</strong></p>`, // This line is fine
    });

    console.log("Verification email sent successfully:", response.messageId);
  } catch (error) {
    console.error("Failed to send email:", error);
  }
};

module.exports = { SendVerificationCode, WelcomeEmail };
