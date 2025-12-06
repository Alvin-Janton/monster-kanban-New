import express from "express";
import db from "../db.js";

const router = express.Router();

// Get all tasks
router.get("/", (req, res) => {
  // Orders by due date (earliest first). If you want "no due date" last, we can tweak this later.
  const tasks = db
    .prepare("SELECT * FROM tasks ORDER BY datetime(due_date) ASC")
    .all();
  res.json(tasks);
});

// Create a task
router.post("/", (req, res) => {
  const { title, status, due_date, importance } = req.body;

  // Normalize due date: "" / undefined → null, also remove "T" from datetime-local input
  const normalizedDueDate =
    due_date && due_date.trim() !== "" ? due_date.replace("T", " ") : null;

  const normalizedImportance = importance || "not_important";

  try {
    const stmt = db.prepare(`
      INSERT INTO tasks (title, status, due_date, importance)
      VALUES (?, ?, ?, ?)
    `);

    const info = stmt.run(
      title,
      status || "todo",
      normalizedDueDate,
      normalizedImportance,
    );

    const task = db
      .prepare("SELECT * FROM tasks WHERE id = ?")
      .get(info.lastInsertRowid);

    res.status(201).json(task);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Failed to create task" });
  }
});

// Update a task
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, status, due_date, importance } = req.body;

  const normalizedDueDate =
    due_date && due_date.trim() !== "" ? due_date.replace("T", " ") : null;

  const normalizedImportance = importance || "not_important";

  try {
    const stmt = db.prepare(`
      UPDATE tasks
      SET title = ?, status = ?, due_date = ?, importance = ?
      WHERE id = ?
    `);

    stmt.run(title, status, normalizedDueDate, normalizedImportance, id);

    const updated = db.prepare("SELECT * FROM tasks WHERE id = ?").get(id);
    res.json(updated);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Failed to update task" });
  }
});

// Delete a task
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.prepare("DELETE FROM tasks WHERE id = ?").run(id);
  res.json({ message: "Task deleted" });
});

export default router;
