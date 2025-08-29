const express = require("express");
const pool = require('./db');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(express.static('.'));

app.get("/", (req, res) => {
  res.send("jobhunt tracker");
});

// Test db connection works
app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM applications');
    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send('Database error');
  }
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});