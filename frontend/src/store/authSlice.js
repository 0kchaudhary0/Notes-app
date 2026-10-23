import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api.js";

// Helper: get the error message sent by the backend
const getErrorMessage = (error) =>
  error.response?.data?.message || "Something went wrong";

// Signup: POST /api/auth/signup
export const signupUser = createAsyncThunk(
  "auth/signup",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/signup", formData);
      return res.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Login: POST /api/auth/login
export const loginUser = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/login", formData);
      return res.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// When the page reloads, read the saved login from localStorage
const initialState = {
  token: localStorage.getItem("token"),
  user: JSON.parse(localStorage.getItem("user")),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    // Signup and login behave the same way, so we handle them together
    [signupUser, loginUser].forEach((thunk) => {
      builder
        .addCase(thunk.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(thunk.fulfilled, (state, action) => {
          state.loading = false;
          state.token = action.payload.token;
          state.user = action.payload.user;
          localStorage.setItem("token", action.payload.token);
          localStorage.setItem("user", JSON.stringify(action.payload.user));
        })
        .addCase(thunk.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
