// backend/server.js
require('dotenv').config();  // Pour lire les variables depuis .env
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');

const app = express();

// Middleware pour parser les JSON dans les requêtes
app.use(express.json());

// Connexion à la base de données
connectDB();

// Routes
app.use('/api/auth', authRoutes);

// Route de test
app.get('/', (req, res) => {
  res.send('API Running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
