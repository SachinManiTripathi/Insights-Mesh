import { createSlice, nanoid } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'chats',
  initialState: {},
  reducers: {
    addChat: {
      reducer: (state, { payload }) => {
        const { sessionId } = payload;
        if (!state[sessionId]) state[sessionId] = [];
        state[sessionId].push(payload);
      },
      prepare: ({ sessionId, role, content }) => ({
        payload: {
          id: nanoid(),
          sessionId,
          role,
          content,
          createdAt: new Date().toISOString(),
        },
      }),
    },
  },
});

export const { addChat } = slice.actions;
export default slice.reducer;
