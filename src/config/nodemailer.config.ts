import nodemailer from 'nodemailer';
import ENV_CONFIG from './env.config';

//! trasporter
export const transporter=nodemailer.createTransport({
  host: ENV_CONFIG.MAIL_HOST,
  service: ENV_CONFIG.MAIL_SERVICE,
  port: ENV_CONFIG.MAIL_PORT,
  secure: ENV_CONFIG.MAIL_SECURE,
  auth: {
    user: ENV_CONFIG.MAIL_USER,
    pass: ENV_CONFIG.MAIL_PASS,
  },
});

export const verifySMTP=async()=>{
    try{
        await transporter.verify();
        console.log("server is ready to send mail");
    }
    catch(error){
        console.log(error);
    }
}