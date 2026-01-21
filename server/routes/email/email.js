const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

function sendEmail({ recipient_email, OTP }) {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD,
      },
    });

    const mail_configs = {
      from: process.env.MY_EMAIL,
      to: recipient_email,
      subject: "PASSWORD RECOVERY",
      html: `<div>
              <h2>${OTP}</h2>
              <p>Use this OTP to recover your password. Valid for 5 minutes.</p>
             </div>`
    };

    transporter.sendMail(mail_configs, (error, info) => {
      if (error) return reject({ message: "Email sending failed" });
      return resolve({ message: "Email sent successfully" });
    });
  });
}

router.post("/send_recovery_email", (req, res) => {
  sendEmail(req.body)
    .then((response) => res.json(response))
    .catch((error) => res.status(500).json(error));
});

module.exports = router;
