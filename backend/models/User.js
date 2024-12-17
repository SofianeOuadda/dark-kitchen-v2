// backend/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Pour hasher les mots de passe

// Schéma pour un utilisateur
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, // Validité de l'email
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hashage du mot de passe avant de le sauvegarder dans la base de données
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Si le mot de passe n'est pas modifié, on passe à l'étape suivante

  const salt = await bcrypt.genSalt(10); // Génération du "sel"
  this.password = await bcrypt.hash(this.password, salt); // Hashage du mot de passe
  next();
});

// Méthode pour comparer les mots de passe
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password); // Compare le mot de passe saisi avec celui hashé
};

// Création du modèle Mongoose pour l'utilisateur
const User = mongoose.model('User', userSchema);
module.exports = User;
