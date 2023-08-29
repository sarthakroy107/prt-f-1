import { createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit';
interface CounterState {
    value:number,
}

const initialState = {
    value:0
} as CounterState
export const counterSlice = createSlice({
    initialState,
    name: "counter",
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
    },
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
