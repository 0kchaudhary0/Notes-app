const Note = require("../models/Note");

// GET /api/notes  -> all notes of the logged-in user (newest first)
const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/notes  -> create a new note
const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const note = await Note.create({ user: req.userId, title, content });
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE /api/notes/:id  -> delete a note (only if it belongs to the user)
const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.userId });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    await note.deleteOne();
    res.json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getNotes, createNote, deleteNote };
