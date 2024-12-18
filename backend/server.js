
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products'); 
const app = express();

// Configurer les options CORS
const corsOptions = {
  origin: 'http://localhost:8080', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Pour envoyer des cookies ou des en-têtes d'authentification
};


app.use(cors(corsOptions));

app.use(express.json());

// Connexion à la base de données
connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes); 

// Route de test
app.get('/', (req, res) => {
  res.send('API Running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
