const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Bienvenue sur mon API déployée sur Vercel ! 🚀');
});

module.exports = app;
