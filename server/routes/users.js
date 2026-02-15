
// Users Routes

// Sync user from Clerk
app.post('/api/users/sync', async (req, res) => {
  const { name, email, phone, role } = req.body;
  try {
    // Check if user exists
    const checkRes = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    
    if (checkRes.rows.length > 0) {
      // Update existing user
      const updateRes = await pool.query(
        `UPDATE users SET name = $1, phone = $2, role = $3 WHERE email = $4 RETURNING *`,
        [name, phone, role || 'user', email]
      );
      return res.json(updateRes.rows[0]);
    } else {
      // Create new user
      const insertRes = await pool.query(
        `INSERT INTO users (name, email, phone, role) VALUES ($1, $2, $3, $4) RETURNING *`,
        [name, email, phone, role || 'user']
      );
      return res.json(insertRes.rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET all users (for admin)
app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});
