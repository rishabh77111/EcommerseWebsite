
import { transporter } from "../config/nodemailer.config";
interface IMailOptions{
    to:string|string[];
    subject:string;
    html:string;
    cc?:string|string[];
    bcc?:string|string[];
    attachments?:any[];
}

export const sendEmail = async (options:IMailOptions) => {
  try {

    console.log("Sending email to:", options.to);
    console.log("Subject:", options.subject);

    const { to, subject, html, cc, bcc, attachments } = options;
    await transporter.sendMail({
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
  } catch (error) {
    console.log(error);
  }
};
