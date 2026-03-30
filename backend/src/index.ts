import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';

import adminRoutes from './routes/adminRoutes';
import voterRoutes from './routes/voterRoutes';
import publicRoutes from './routes/publicRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/voter', voterRoutes);
app.use('/api', publicRoutes);

// Connect DB and Start
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/evoting')
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Backend running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error(err));
