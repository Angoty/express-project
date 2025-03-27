// models/User.js
const mongoose = require('mongoose');

// Définir le schéma de l'utilisateur
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

// Créer et exporter le modèle
const User = mongoose.model('User', userSchema);
module.exports = User;
