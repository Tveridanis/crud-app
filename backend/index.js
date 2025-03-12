// index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Authentification
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  const { user, error } = await supabase.auth.signUp({ email, password });
  if (error) return res.status(400).json({ error: error.message });
  res.json(user);
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const { user, error } = await supabase.auth.signIn({ email, password });
  if (error) return res.status(401).json({ error: error.message });
  res.json(user);
});

// CRUD Personnes
app.get('/personnes', async (req, res) => {
  const { data, error } = await supabase
    .from('personnes')
    .select('*')
    .range(req.query.start, req.query.end);
  if (error) return res.status(500).json({ error });
  res.json(data);
});

// Ajouter des routes similaires pour groupes et entreprises...

// Export/Import
app.post('/export', async (req, res) => {
  const { table } = req.body;
  const { data, error } = await supabase.from(table).select('*');
  if (error) return res.status(500).json({ error });
  res.json(data);
});

app.post('/import', async (req, res) => {
  const { table, data } = req.body;
  const { error } = await supabase.from(table).insert(data);
  if (error) return res.status(500).json({ error });
  res.json({ success: true });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));