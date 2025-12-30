import { createSlice } from "@reduxjs/toolkit";

interface UiState {
    isDrawerOpen: boolean;
}

const initialState: UiState = {
    isDrawerOpen: false,
};

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        openDrawer: (state) => {
            state.isDrawerOpen = true;
        },
        closeDrawer: (state) => {
            state.isDrawerOpen = false;
        },
        toggleDrawer: (state) => {
            state.isDrawerOpen = !state.isDrawerOpen;
        },
    },
});

export const { openDrawer, closeDrawer, toggleDrawer } = uiSlice.actions;
export default uiSlice.reducer;
