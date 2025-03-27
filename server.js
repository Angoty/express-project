const express = require('express');
const app = express();

// Route simple pour tester le déploiement
app.get('/', (req, res) => {
    res.send('Bienvenue sur mon API déployée sur Vercel ! 🚀');
});

// Exporter l'application pour Vercel (PAS de `listen`)
module.exports = app;
