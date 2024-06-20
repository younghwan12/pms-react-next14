// errorSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ErrorState {
    errorCode: string | null;
    errorMessage: string | null;
}

const initialState: ErrorState = {
    errorCode: null,
    errorMessage: null,
};

const errorSlice = createSlice({
    name: "error",
    initialState,
    reducers: {
        setError(state, action: PayloadAction<{ errorCode: string; errorMessage: string }>) {
            console.log("dd");
            state.errorCode = action.payload.errorCode;
            state.errorMessage = action.payload.errorMessage;
        },
        clearError(state) {
            state.errorCode = null;
            state.errorMessage = null;
        },
    },
});

export const { setError, clearError } = errorSlice.actions;
export default errorSlice.reducer;
