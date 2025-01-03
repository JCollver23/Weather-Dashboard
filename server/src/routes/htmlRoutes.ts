import express, { Router } from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Get the current file path and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a new Express router
const router = Router();

// Define route to serve index.html
router.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '../../../client/dist/index.html'));
});

// Optional: Serve static assets (like CSS, JS, images) from a 'public' folder
router.use(express.static(path.join(__dirname, 'public')));

export default router;