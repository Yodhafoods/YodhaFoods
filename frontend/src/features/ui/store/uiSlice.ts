import { createSlice } from "@reduxjs/toolkit";

interface UiState {
    activeDrawer: string | null;
}

const initialState: UiState = {
    activeDrawer: null,
};

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        openDrawer: (state, action) => {
            state.activeDrawer = action.payload;
        },
        closeDrawer: (state) => {
            state.activeDrawer = null;
        },
        toggleDrawer: (state, action) => {
            state.activeDrawer = state.activeDrawer ? null : action.payload;
        },
    },
});

export const { openDrawer, closeDrawer, toggleDrawer } = uiSlice.actions;

export const selectActiveDrawer = (state: any) => state.ui.activeDrawer;

export default uiSlice.reducer;
