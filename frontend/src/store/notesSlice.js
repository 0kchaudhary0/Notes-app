import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api.js";

const getErrorMessage = (error) =>
  error.response?.data?.message || "Something went wrong";

// Get all notes of the logged-in user: GET /api/notes
export const fetchNotes = createAsyncThunk(
  "notes/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/notes");
      return res.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Add a new note: POST /api/notes
export const addNote = createAsyncThunk(
  "notes/add",
  async (noteData, { rejectWithValue }) => {
    try {
      const res = await api.post("/notes", noteData);
      return res.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Delete a note: DELETE /api/notes/:id
export const deleteNote = createAsyncThunk(
  "notes/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/notes/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

const notesSlice = createSlice({
  name: "notes",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchNotes
      .addCase(fetchNotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // addNote: put the new note at the top of the list
      .addCase(addNote.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(addNote.rejected, (state, action) => {
        state.error = action.payload;
      })
      // deleteNote: remove the note from the list
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.items = state.items.filter((note) => note._id !== action.payload);
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default notesSlice.reducer;
