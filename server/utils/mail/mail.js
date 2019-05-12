const mailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
require("dotenv").config();
const { welcome } = require("./welcomeTemplate");
const { resetPass } = require("./resetTemplate");
const { purchase } = require("./purchaseTemplate");

const oauth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_SECRET,
  "https://developers.google.com/oauthplayground" // Redirect URL
);

// oauth2Client.setCredentials({
//   refresh_token: process.env.REFRESH_TOKEN
// });
// const tokens = await oauth2Client.refreshAccessToken();
// const accessToken = tokens.credentials.access_token;

oauth2Client.setCredentials({
	access_token: process.env.ACCESS_TOKEN,
	refresh_token: process.env.REFRESH_TOKEN,
  // expiry_date: new Date(_user.expiryDate).valueOf() || true
  	// expiry_date: new Date().valueOf()
});

const getEmailData = (to, name, token, template, actionData) => {
  let data = null;
  switch (template) {
    case "welcome":
      data = {
        from: "Cinema Centre <maytheu98@gmail.com>",
        to,
        subject: `Welcome to Cinema Centre ${name}`,
        html: welcome()
      };
      break;
    case "reset_password":
      data = {
        from: "Cinema Centre <maytheu98@gmail.com>",
        to,
        subject: `${name}, reset your password`,
        html: resetPass(actionData)
      };
      break;
    case "purchase":
      data = {
        from: "Cinema Centre <maytheu98@gmail.com>",
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
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "maytheu98@gmail.com",
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: process.env.ACCESS_TOKEN
    }
  });

  const mail = getEmailData(to, name, token, type, actionData);

  smtpTransport.sendMail(mail, function(error, response) {
    if (error) {
      console.log(error);
    } else {
      console.log(response);
    }
    smtpTransport.close();
  });
};

module.exports = { sendEmail };
