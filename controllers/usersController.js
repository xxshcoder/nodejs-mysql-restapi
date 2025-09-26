// controllers/usersController.js
import pool from "../db.js";

/**
 * Helper: run query with pool and return [rows, fields]
 */
async function query(sql, params = []) {
  const [rows] = await pool.execute(sql, params);
  return rows;
}

export const getUsers = async (req, res, next) => {
  try {
    const rows = await query(
      "SELECT id, name, email, age, created_at FROM users ORDER BY id DESC"
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ error: "Invalid id" });

    const rows = await query(
      "SELECT id, name, email, age, created_at FROM users WHERE id = ?",
      [id]
    );
    if (!rows.length) return res.status(404).json({ error: "User not found" });

    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const { name, email, age } = req.body;
    if (!name || !email)
      return res.status(400).json({ error: "name and email are required" });

    const result = await query(
      "INSERT INTO users (name, email, age) VALUES (?, ?, ?)",
      [name, email, age ?? null]
    );

    const insertedId = result.insertId;
    const created = await query(
      "SELECT id, name, email, age, created_at FROM users WHERE id = ?",
      [insertedId]
    );
    res.status(201).json(created[0]);
  } catch (err) {
    // handle duplicate email nicely
    if (err && err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ error: "Email already exists" });
    }
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ error: "Invalid id" });

    const { name, email, age } = req.body;
    // You can validate fields here
    const result = await query(
      "UPDATE users SET name = COALESCE(?, name), email = COALESCE(?, email), age = COALESCE(?, age) WHERE id = ?",
      [name, email, age ?? null, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ error: "User not found" });

    const updated = await query(
      "SELECT id, name, email, age, created_at FROM users WHERE id = ?",
      [id]
    );
    res.json(updated[0]);
  } catch (err) {
    if (err && err.code === "ER_DUP_ENTRY")
      return res.status(409).json({ error: "Email already exists" });
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ error: "Invalid id" });

    const result = await query("DELETE FROM users WHERE id = ?", [id]);
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "User not found" });

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
