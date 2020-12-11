const sgMail = require("@sendgrid/mail");
const Mailgen = require("mailgen");
require("dotenv").config();

class EmailService {
  async sendEmail(name, email, token) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const mailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Contacst",
        link: "http://localhost:3000/",
      },
    });

    const template = {
      body: {
        name: name,
        intro: "Welcome to our site! We're very excited to have you on board.",
        action: {
          button: {
            color: "#22BC66", // Optional action button color
            text: "Confirm your account",
            link: `http://localhost:3000/auth/verify/${token}`,
          },
        },
      },
    };

    const emailBody = mailGenerator.generate(template);

    const msg = {
      to: email,
      from: "test34512@gmail.com",
      subject: "Verify your account",
      text: "Hello",
      html: emailBody,
      // html: "<h1>Hello</h1>",
    };
    sgMail.send(msg).then(
      () => {},
      (error) => {
        console.error(error);

        if (error.response) {
          console.error(error.response.body);
        }
      }
    );
  }
}
module.exports = EmailService;
