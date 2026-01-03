import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import newsRoutes from './routes/news.routes.js';

dotenv.config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5050;

if (!process.env.GNEWS_API_KEY) {
  console.error('Missing GNEWS_API_KEY in server/.env');
  process.exit(1);
}

app.use('/api', newsRoutes);

app.listen(PORT, '127.0.0.1', () => {
  console.log(`WWNews API running on http://localhost:${PORT}`);
});
