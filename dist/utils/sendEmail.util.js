"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_config_1 = require("../config/nodemailer.config");
const sendEmail = async (options) => {
    try {
        console.log("Sending email to:", options.to);
        console.log("Subject:", options.subject);
        const { to, subject, html, cc, bcc, attachments } = options;
        await nodemailer_config_1.transporter.sendMail({
            to,
            from: "EcommerseWebsite-BI <rishabhagrahari77@gmail.com>", // Fixed sender
            subject,
            html,
            cc,
            bcc,
            attachments,
        });
        console.log("Email sent successfully");
        console.log("email sent");
    }
    catch (error) {
        console.log(error);
    }
};
exports.sendEmail = sendEmail;
