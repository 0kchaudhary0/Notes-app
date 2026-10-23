import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import notesReducer from "./notesSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
