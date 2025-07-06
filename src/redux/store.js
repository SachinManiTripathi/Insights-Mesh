import { configureStore } from "@reduxjs/toolkit";
import theme from "../redux/slices/themeSlice"
import sessions from "../redux/slices/sessionSlice";
import chats from "../redux/slices/chatSlice";

export const store = configureStore({
  reducer: { theme, sessions,chats }
});