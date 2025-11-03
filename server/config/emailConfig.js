import dotenv from 'dotenv';

dotenv.config({path: '../.env'});

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.SENDER_EMAIL_USER,
        pass: process.env.SENDER_EMAIL_PASS,
    },
});

export const sendActivationEmail = async (email, token) => {
    const link = `${process.env.CLIENT_URL}/activate-account?token=${token}`;

    await transporter.sendMail({
        from: process.env.SENDER_EMAIL_USER,
        to: email,
        subject: 'Activate your account',
        html: `
    <p>Please activate your account by clicking the link below:</p>
    <a href="${link}">Activate Account</a>
  `,
    });
};

export const sendResetPasswordEmail = async (email, token) => {
    const link = `${process.env.CLIENT_URL}/reset-password?token=${token}`;

    await transporter.sendMail({
        from: process.env.SENDER_EMAIL_USER,
        to: email,
        subject: 'Reset your password',
        html: `
    <p>Click the link below to reset your password:</p>
    <a href="${link}">Reset Password</a>
  `,
    });
};
