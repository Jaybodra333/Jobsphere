import http from 'http';
import app from './app';
import { connectDB } from './config/db';
import { env } from './config/env';

const startServer = async () => {
  await connectDB();
  const server = http.createServer(app);

  server.listen(env.port, () => {
    console.log(`🚀 API ready on http://localhost:${env.port}`);
  });
};

startServer();

