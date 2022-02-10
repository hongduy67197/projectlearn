// part2
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function mainsendEmail() {
  //   let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "destinyoblivion97@gmail.com",
      pass: "Anxiety16092020", // naturally, replace both with your real credentials or an application-specific password
    },
  });

  let info = await transporter.sendMail(
    {
      from: "destinyoblivion97@gmail.com", // sender address
      to: "hongduy67197@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    },
    function (err, res) {
      if (err) {
        console.log(err);
      } else {
        console.log("Message sent successfully");
      }
    }
  );
}

//ham goi den function mainsendEmail()
// mainsendEmail().catch(console.error);

module.exports = { mainsendEmail };
