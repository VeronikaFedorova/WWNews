import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import newsRoutes from './routes/news.routes.js';

dotenv.config();

const app = express();
app.use(cors());

const PORT: number = process.env.PORT ? Number(process.env.PORT) : 5050;

if (Number.isNaN(PORT)) {
  console.error('Invalid PORT in environment. Must be a number.');
  process.exit(1);
}

if (!process.env.GNEWS_API_KEY) {
  console.error('Missing GNEWS_API_KEY in server/.env');
  process.exit(1);
}

app.use('/api', newsRoutes);

app.listen(PORT, '127.0.0.1', () => {
  console.log(`WWNews API running on http://localhost:${PORT}`);
});
