const mailer = require("nodemailer");
require("dotenv").config();
const { welcome } = require("./welcomeTemplate");
const { resetPass } = require("./resetTemplate");
const {purchase} = require('./purchaseTemplate')

const getEmailData = (to, name, token, template, actionData) => {
  let data = null;
  switch (template) {
    case "welcome":
      data = {
        from: "Cinema Centre <maytheuhaydey@gmail.com>",
        to,
        subject: `Welcome to Cinema Centre ${name}`,
        html: welcome()
      };
      break;
    case "reset_password":
      data = {
        from: "Cinema Centre <maytheuhaydey@gmail.com>",
        to,
        subject: `${name}, reset your password`,
        html: resetPass(actionData)
      };
      break;
    case "purchase":
      data = {
        from: "Cinema Centre <maytheuhaydey@gmail.com>",
        to,
        subject: `${name}, Thank you for purchasing`,
        html: purchase(actionData)
      };
      break;

    default:
      data;
  }
  return data;
};

const sendEmail = (to, name, token, type, actionData = null) => {
  const smtpTransport = mailer.createTransport({
    service: "Gmail",
    auth: {
      user: "maytheuhaydey@gmail.com",
      pass: process.env.EMAIL_PASS
    }
  });

  const mail = getEmailData(to, name, token, type, actionData);

  smtpTransport.sendMail(mail, function(error, response) {
    if (error) {
      console.log(error);
    } else {
      console.log("email sent");
    }
    smtpTransport.close();
  });
};

module.exports = { sendEmail };
