const sgMail = require("@sendgrid/mail");
const { sendGrid } = require("./config/keys");
sgMail.setApiKey(
  "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"
);

const msg = {
  to: "rak3sh.shrestha@gmail.com",
  from: "noone@gmail.com",
  subject: "test",
  text: "this is a test",
  html: "<h1><a href='http://localhost:3000'>Yes</a></h1>"
};

sgMail.send(msg);
