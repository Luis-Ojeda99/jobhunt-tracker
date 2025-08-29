const express = require('express');
const pool = require('./db/connection');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('jobhunt tracker');
});

// Get all applications
app.get('/api/applications', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM applications ORDER BY date_applied DESC');
    res.json(result.rows);
  } catch (err) {
    console.log('Error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});