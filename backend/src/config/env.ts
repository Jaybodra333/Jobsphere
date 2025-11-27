import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: Number(process.env.PORT || 5000),
  mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/job_portal',
  jwtSecret: process.env.JWT_SECRET || 'change-me',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  email: {
    host: process.env.EMAIL_HOST || '',
    port: Number(process.env.EMAIL_PORT || 587),
    user: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASS || '',
    from: process.env.EMAIL_FROM || 'Job Portal <no-reply@jobportal.com>',
  },
  admin: {
    name: process.env.ADMIN_NAME || 'Admin User',
    email: process.env.ADMIN_EMAIL || 'admin@example.com',
    password: process.env.ADMIN_PASSWORD || 'ChangeMe123!',
  },
};

export const isEmailConfigured =
  !!env.email.host && !!env.email.user && !!env.email.pass;

