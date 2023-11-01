const nodemailer = require('nodemailer')
const ejs = require('ejs')
const htmlToText = require('html-to-text')
module.exports = class Email {
  constructor(user, url) {
    (this.to = user.email),
      (this.firstName = user.name.split(" ")[0]),
      (this.from = `Creedlance <${process.env.EMAIL_FROM}`);
    this.url = url;
  }
  createTransport() {
    return nodemailer.createTransport({
      // service: 'gmail',
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }
  async send(template, subject) {
    try {
      const html = await ejs.renderFile(
        `${__dirname}/../views/${template}.ejs`,
        {
          firstName: this.firstName,
          url: this.url,
          subject,
        }
      );

      const mailOptions = {
        from: this.from,
        to: this.to,
        subject,
        html,
        text: htmlToText.convert(html, {
          wordwrap: 130,
        }),
      };
      
      await this.createTransport().sendMail(mailOptions);
      console.log("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }

  async sendWelcome() {
    await this.send("welcome", "Welcome to the Creedlance!");
  }

  async sendLoginMail() {
    await this.send("Login", "CONFIRM YOUR ACCOUNT");
  }
  async sendPasswordReset() {
    await this.send("passwordReset", "Password Reset Request!");
  }
};