const express = require("express");
const pool = require("./db/connection");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("jobhunt tracker");
});

// Get all applications
app.get("/api/applications", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM applications ORDER BY date_applied DESC"
    );
    res.json(result.rows);
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// Create new application
app.post("/api/applications", async (req, res) => {
  const { company, position, status, notes } = req.body;

  if (!company || !position) {
    return res.status(400).json({ error: "Company and position required" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO applications (company, position, status, notes) VALUES ($1, $2, $3, $4) RETURNING *",
      [company, position, status || "applied", notes || null]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.log("Error creating:", err);
    res.status(500).json({ error: "Failed to create" });
  }
});

// Delete application
app.delete("/api/applications/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM applications WHERE id = $1", [id]);
    res.json({ success: true });
  } catch (err) {
    console.log("Delete error:", err);
    res.status(500).json({ error: "Failed to delete" });
  }
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
