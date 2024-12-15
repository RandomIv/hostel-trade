import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config({ path: '.../.env' });

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.SENDER_EMAIL_USER,
    pass: process.env.SENDER_EMAIL_PASS,
  },
});

export const sendEmail = async (to, subject, html) => {
  await transporter.sendMail({
    from: process.env.SENDER_EMAIL_USER,
    to,
    subject,
    html,
  });
};
