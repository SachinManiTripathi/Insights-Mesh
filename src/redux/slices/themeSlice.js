import { createSlice } from '@reduxjs/toolkit';

// Helper: decide what the very first theme should be
const getInitialMode = () => {
  if (typeof window === 'undefined') return 'light';        // SSR safety

  // 1) Stored preference?
  const stored = localStorage.getItem('theme');
  if (stored === 'dark' || stored === 'light') return stored;

  // 2) Otherwise match the OS
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

const themeSlice = createSlice({
  name: 'theme',
  initialState: { mode: getInitialMode() },
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.mode); 
    },
    setTheme: (state, { payload }) => {
      state.mode = payload === 'dark' ? 'dark' : 'light';
      localStorage.setItem('theme', state.mode);
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export const selectMode = (s) => s.theme.mode;
export default themeSlice.reducer;