import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (
  to: string,
  html: string,
  from: string,
  subject: string,
  text: string,
) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.node_env === 'production',
    auth: {
      user: config.sender_email,
      pass: config.sender_app_password,
    },
  });

  return await transporter.sendMail({
    from,
    // 'mdrezaulkarrim@gmail.com', // sender address
    to, // list of receivers
    subject,
    //  'Change your password', // Subject line
    text,
    //  'Reset your password within 10mins', // plain text body
    html, // html body
  });
};
