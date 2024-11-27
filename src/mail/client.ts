import nodemailer from 'nodemailer';

const mailConfig = {
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
};
export const transporter = nodemailer.createTransport(mailConfig);
