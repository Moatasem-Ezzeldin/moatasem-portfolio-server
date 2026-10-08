const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
    // 1) Create transporter ( services that will send email like "gmail", "mialtrap", "sendGrid" )
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT, // if secure false port = 587,  if secure true port = 465
        secure: true,
        // service: "gmail",
        auth: {
            user: process.env.EMAIL_PORTFOLIO_USER,
            pass: process.env.EMAIL_PORTFOLIO_PASS,
        },
    });

    // 2) Define email options ( like from, to, subject, email, content )
    const mailOptions = {
        from: `Moatasem Portfolio <${process.env.EMAIL_PORTFOLIO_USER}>`,
        to: process.env.EMAIL_PORTFOLIO_USER,
        subject: options.subject,
        html: options.html,
        replyTo: options.replyTo,

    };

    // 3) Send email
    await transporter.sendMail(mailOptions);
};
module.exports = sendEmail;