const fs = require("fs");
const path = require("path");
const sendEmail = require("../utils/sendEmail");

exports.sendContactEmail = async ({
    fullName,
    email,
    subject,
    message,
}) => {
    const templatePath = path.join(
        __dirname,
        "../templates/emailTemplate.html"
    );

    let html = fs.readFileSync(templatePath, "utf8");

    html = html
        .replace(/{{fullName}}/g, fullName)
        .replace(/{{email}}/g, email)
        .replace(/{{subject}}/g, subject)
        .replace(/{{message}}/g, message);

    await sendEmail({
        subject: `Portfolio Contact: ${subject}`,
        html,
        email,
    });
};