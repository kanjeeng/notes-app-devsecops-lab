// src/app.js
const express = require('express');
const bodyParser = require('body-parser');
const store = require('./store');

const app = express();
app.use(bodyParser.json());

app.get('/', (_req, res) => {
  res.json({ service: 'notes-app', health: 'ok' });
});

app.get('/notes', (_req, res) => {
  res.json(store.listNotes());
});

app.get('/notes/:id', (req, res) => {
  const note = store.getNote(req.params.id);
  if (!note) return res.status(404).json({ error: 'not found' });
  res.json(note);
});

app.post('/notes', (req, res) => {
  const { title, body } = req.body || {};
  if (!title || !body) return res.status(400).json({ error: 'title & body required' });
  const created = store.createNote({ title, body });
  res.status(201).json(created);
});

app.put('/notes/:id', (req, res) => {
  const updated = store.updateNote(req.params.id, req.body || {});
  if (!updated) return res.status(404).json({ error: 'not found' });
  res.json(updated);
});

app.delete('/notes/:id', (req, res) => {
  const ok = store.deleteNote(req.params.id);
  if (!ok) return res.status(404).json({ error: 'not found' });
  res.status(204).send();
});

module.exports = app;
