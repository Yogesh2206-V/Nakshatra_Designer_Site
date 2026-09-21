import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import optionsRoutes from './src/routes/options.js';
import designsRoutes from './src/routes/designs.js';
import ordersRoutes from './src/routes/orders.js';
import pickupsRoutes from './src/routes/pickups.js';
import authRoutes from './src/routes/auth.js';

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/nakshatra_tailor';

// Middlewares
app.use(cors());
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb', extended: true }));

// Connect to MongoDB with fallback
mongoose.set('bufferCommands', false);
mongoose.connect(MONGO_URI, {
  serverSelectionTimeoutMS: 8000
})
  .then(() => {
    const maskedUri = MONGO_URI.includes('@') 
      ? MONGO_URI.replace(/:([^:@]+)@/, ':****@') 
      : MONGO_URI;
    console.log(`🍃 Connected to MongoDB database: ${maskedUri}`);
  })
  .catch((err) => {
    console.warn(`⚠️ MongoDB connection error (using local database store fallback): ${err.message}`);
  });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/options', optionsRoutes);
app.use('/api/designs', designsRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/pickups', pickupsRoutes);

import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, '../frontend/dist');

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: "Nakshatra Designer's Blouse Stitching API",
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected/fallback',
    time: new Date().toISOString()
  });
});

// Google Search Console verification handler
app.get('/google:code.html', (req, res) => {
  res.type('text/html').send(`google-site-verification: google${req.params.code}.html`);
});

// Serve frontend build if present
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  // Root landing page when running API only
  app.get('/', (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="google-site-verification" content="0jegZS-Mpd6_0bjNhtW9s0vXfvNlbuTgxXlRv7epWD4" />
        <title>Nakshatra Designer's API Server</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0f172a; color: #f8fafc; margin: 0; padding: 40px 20px; display: flex; justify-content: center; align-items: center; min-height: 80vh; }
          .card { background: #1e293b; border-radius: 16px; padding: 32px; max-width: 600px; width: 100%; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.5); border: 1px solid #334155; }
          h1 { color: #f59e0b; margin-top: 0; font-size: 24px; display: flex; align-items: center; gap: 8px; }
          .badge { display: inline-block; background: #059669; color: #fff; padding: 4px 10px; border-radius: 9999px; font-size: 12px; font-weight: 600; margin-bottom: 16px; }
          p { color: #94a3b8; font-size: 15px; line-height: 1.6; }
          .links { margin-top: 24px; display: flex; flex-direction: column; gap: 10px; }
          .link-btn { display: flex; justify-content: space-between; align-items: center; background: #334155; color: #f8fafc; text-decoration: none; padding: 12px 18px; border-radius: 8px; font-weight: 500; transition: 0.2s background; }
          .link-btn:hover { background: #475569; }
          .primary-btn { background: #d97706; color: white; font-weight: bold; }
          .primary-btn:hover { background: #b45309; }
          code { background: #0f172a; padding: 2px 6px; border-radius: 4px; font-size: 13px; color: #38bdf8; }
        </style>
      </head>
      <body>
        <div class="card">
          <span class="badge">● Server Active & Online</span>
          <h1>✨ Nakshatra Designer's API</h1>
          <p>This is the <strong>Backend API server</strong> running on port <code>5000</code>.</p>
          <div class="links">
            <a class="link-btn" href="/api/health" target="_blank">
              <span>🩺 Health Check API</span>
              <code>/api/health</code>
            </a>
            <a class="link-btn" href="/api/designs" target="_blank">
              <span>👗 Designs Catalog API</span>
              <code>/api/designs</code>
            </a>
            <a class="link-btn" href="/api/options" target="_blank">
              <span>✂️ Stitching Options & Pricing</span>
              <code>/api/options</code>
            </a>
          </div>
        </div>
      </body>
      </html>
    `);
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✨ Nakshatra Designer's Backend Server running on port ${PORT} (0.0.0.0)`);
});
