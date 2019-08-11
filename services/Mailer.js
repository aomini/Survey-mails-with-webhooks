const sgMail = require("@sendgrid/mail");
const { sendGrid } = require("../config/keys");
sgMail.setApiKey(sendGrid);

class Mailer {
  constructor({ subject, recipents }, html) {
    this.to = this.formatAddresses(recipents);
    this.from = "noreply@emaily.com";
    this.subject = subject;
    this.html = html;
  }

  formatAddresses(recipents) {
    return recipents.map(x => x.email);
  }

  async send() {
    return await sgMail.send({
      to: this.to,
      from: "noReply@gmail.com",
      subject: this.subject,
      html: this.html
    });
  }
}

module.exports = Mailer;
