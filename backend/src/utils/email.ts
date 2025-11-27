import nodemailer from 'nodemailer';
import { env, isEmailConfigured } from '../config/env';

const transporter = isEmailConfigured
  ? nodemailer.createTransport({
      host: env.email.host,
      port: env.email.port,
      secure: env.email.port === 465,
      auth: {
        user: env.email.user,
        pass: env.email.pass,
      },
    })
  : null;

export const sendEmail = async (options: {
  to: string;
  subject: string;
  html: string;
}) => {
  if (!transporter) {
    console.warn('Email credentials missing. Skipping email send.');
    return;
  }

  await transporter.sendMail({
    from: env.email.from,
    ...options,
  });
};

