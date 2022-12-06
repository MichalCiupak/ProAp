"use strict"; // idk
const nodemailer = require("nodemailer");
const { StatusCodes } = require("http-status-codes");
// TODO
// Check if user already registered and confirmed -> you already confirmed you mail
// delete all other instances with the same email but with not confirmed email
// IN FRONTEND - if jwt expired -> send specific page
//
const confirmEmailAndCreateUser = async (req, res) => {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  try {
    let testAccount = await nodemailer.createTestAccount();
    console.log(testAccount);
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: "frb82070@cdfaq.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  } catch (error) {
    console.log("error from emailController");
    console.log(error);
  }
  return res.status(StatusCodes.CREATED).json({ msg: "ok" });
};

module.exports = { confirmEmailAndCreateUser };
