import { createSlice, nanoid } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "sessions",
    initialState: { list: [], filter: 'ALL' },
    reducers: {
        addSession: {
            reducer: (state, { payload }) => {
                console.log('Adding session:', payload);
                const exists = state.list.some(s => s.id === payload.id);
                if (!exists) state.list.unshift(payload);
            },
            prepare: ({
                id = nanoid(),
                createdAt = new Date().toISOString(),
                title = 'New Chat Session',
                summary = '',
                tag = 'General',
            } = {}) => ({
                payload: { id, createdAt, title, summary, tag },
            }),
        },
        updateSession: (state, { payload }) => {
            console.log('Updating session:', payload);
            const index = state.list.findIndex(sessions => sessions.id === payload.id);
            if (index !== -1) {
                state.list[index] = { ...state.list[index], ...payload };
            }
        },
        setSessions: (state, { payload }) => {
            state.list = payload;
        },

        setFilter: (state, { payload }) => {
            state.filter = payload;
        },
    }
});

export const { addSession, updateSession, setSessions, setFilter } = slice.actions;
export default slice.reducer;