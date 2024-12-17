// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Importer le middleware CORS
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');

const app = express();

// Configurer les options CORS
const corsOptions = {
  origin: 'http://localhost:8080', // Autoriser uniquement cette origine
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Si vous souhaitez envoyer des cookies ou des en-têtes d'authentification
};

// Utiliser le middleware CORS avec les options définies
app.use(cors(corsOptions));

// Middleware pour parser les JSON
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
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
