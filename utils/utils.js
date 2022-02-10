// const nodemailer = require("nodemailer");

// async function sendEmail() {
//   //   let testAccount = await nodemailer.createTestAccount();

//   let Transport = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: "destinyoblivion97@gmail.com",
//       pass: "Anxiety16092020",
//     },
//   });
//   let mailOptions = {
//     from: `destinyoblivion97@gmail.com`,
//     to: "hongduy67197@gmail.com",
//     subject: "Test Nodemailer",
//     text: "Hello world",
//     html: "<b>Have a nice day</b>",
//   };
//   Transport.sendMail(mailOptions, function (err, info) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Message sent");
//       resizeBy.json(200);
//     }
//   });
// }

// module.exports = sendEmail;

// part2
// const nodemailer = require("nodemailer");

// // async..await is not allowed in global scope, must use a wrapper
// async function sendEmail() {
//   // Generate test SMTP service account from ethereal.email
//   // Only needed if you don't have a real mail account for testing
//   let testAccount = await nodemailer.createTestAccount();

//   // create reusable transporter object using the default SMTP transport
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: "destinyoblivion97@gmail.com",
//       pass: "Anxiety16092020", // naturally, replace both with your real credentials or an application-specific password
//     },
//   });

//   // send mail with defined transport object
//   let info = await transporter.sendMail({
//     from: "destinyoblivion97@gmail.com", // sender address
//     to: "hongduy67197@gmail.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
//   });

//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//   // Preview only available when sending through an Ethereal account
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// }

// sendEmail().catch(console.error);

// part3
// const express = require("express");
// const router = express.Router();
// var nodemailer = require("nodemailer"); // khai báo sử dụng module nodemailer
// router.post("/send", function (req, res, next) {
//   var transporter = nodemailer.createTransport({
//     // config mail server
//     service: "Gmail",
//     auth: {
//       user: "destinyoblivion97@gmail.com",
//       pass: "Anxiety16092020",
//     },
//   });
//   var mainOptions = {
//     // thiết lập đối tượng, nội dung gửi mail
//     from: "Thanh Batmon",
//     to: "hongduy67197@gmail.com",
//     subject: "Test Nodemailer",
//     text: "Hello world? ",
//     html: "<b>Hello world?</b>",
//   };
//   transporter.sendMail(mainOptions, function (err, info) {
//     if (err) {
//       console.log(err);
//       res.redirect("/");
//     } else {
//       console.log("Message sent: " + info.response);
//       res.redirect("/");
//     }
//   });
// });

// module.exports = router;
