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
  const { company, position, status, notes, dateApplied } = req.body;

  if (!company || !position) {
    return res.status(400).json({ error: "Company and position required" });
  }

  try {
    const date = dateApplied || new Date().toISOString().split("T")[0];

    const result = await pool.query(
      "INSERT INTO applications (company, position, status, notes, date_applied) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [company, position, status || "applied", notes || null, date]
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
    await pool.query(
      "DELETE FROM applications WHERE id = $1", 
      [id]
    );
    res.json({ success: true });
  } catch (err) {
    console.log("Delete error:", err);
    res.status(500).json({ error: "Failed to delete" });
  }
});

// update status
app.patch("/api/applications/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const result = await pool.query(
      "UPDATE applications SET status = $1 WHERE id = $2 RETURNING *",
      [status, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.log("Update error:", err);
    res.status(500).json({ error: "Failed to update" });
  }
});

// Get some stats
app.get("/api/stats", async (req, res) => {
  try {
    const total = await pool.query(
      "SELECT COUNT(*) FROM applications"
    );
    const interviews = await pool.query(
      "SELECT COUNT(*) FROM applications WHERE status = 'interview'"
    );
    const rejected = await pool.query(
      "SELECT COUNT(*) FROM applications WHERE status = 'rejected'"
    );
    res.json({
      total: total.rows[0].count,
      interviews: interviews.rows[0].count,
      rejected: rejected.rows[0].count,
    });
  } catch (err) {
    console.log("Stats error:", err);
    res.status(500).json({ error: "Failed to get stats" });
  }
});

// catch errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke");
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
