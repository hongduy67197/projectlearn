const nodemailer = require("nodemailer");

class CodeCheck {
  constructor(code) {
    this.code = code;
  }
  getCode() {
    return this.code;
  }
  setCode(code) {
    this.code = code;
  }
}

function generateCode() {
  return Math.random().toString().substring(2, 8);
}

// async..await is not allowed in global scope, must use a wrapper
async function sendEmail(id, email, codeCheck, mode) {
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

  // let info = await transporter.sendMail(
  //   {
  //     from: "projectlearn", // sender address
  //     to: email, // list of receivers
  //     subject: "Hello ✔", // Subject line
  //     text: "Email registered successfully", // plain text body
  //     html: `<a href=http://localhost:8000/user/${id}/${email}/${codeCheck}>click here to complete register</a>`, // html body
  //   },
  //   function (err, res) {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       console.log("Message sent successfully");
  //     }
  //   }
  // );
}

//ham goi den function mainsendEmail()
// mainsendEmail().catch(console.error);

module.exports = { sendEmail, CodeCheck, generateCode };
