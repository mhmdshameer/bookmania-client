// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import { loadState, saveState } from './utils/localStorage'; // Import your local storage functions
import rootReducer from "./reducers"; // Import your combined reducers

const preloadedState = loadState(); // Load the saved state if available

const store = configureStore({
  reducer: rootReducer,
  preloadedState, // Use the loaded state as the initial state
  // Optional: Add any middleware or enhancers here
});

// Save specific parts of state to localStorage on each state change
store.subscribe(() => {
  saveState({
    authData: store.getState().authReducers.authData,
    users: store.getState().userReducer.users,
    posts: store.getState().postReducer.posts,
  });
});

export default store;
