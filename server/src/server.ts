import dotenv from 'dotenv';
import express from 'express';
dotenv.config();

// Import the routes
import routes from './routes/index.js';

const app = express();

// Set the port from environment variables or default to 3001
const PORT = process.env.PORT || 3001;

// Serve static files from the "dist" directory (or replace with your directory name if needed)
app.use(express.static('../client/dist'));  // This serves everything inside the dist folder

// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware to parse URL-encoded form data (from HTML forms)
app.use(express.urlencoded({ extended: true }))

// Connect the routes to the app
app.use(routes); 

// Start the server on the port
app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
});
