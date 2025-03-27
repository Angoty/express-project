const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/baseVao', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

const User = mongoose.model('User', userSchema, 'utilisateur');

// Routes CRUD
app.post('/users', async (req, res) => {
  const { name, email } = req.body;

  const user = new User({ name, email });

  try {
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).send('User not found');
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const user = await User.findByIdAndUpdate(id, { name, email }, { new: true });
    if (!user) return res.status(404).send('User not found');
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).send('User not found');
    res.status(200).send('User deleted');
  } catch (err) {
    res.status(500).send(err);
  }
});

// 🚀 Exporter l'application pour Vercel
module.exports = app;
