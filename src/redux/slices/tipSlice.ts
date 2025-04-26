import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TipState {
  value: number;
}

const initialState: TipState = {
  value: 0,
};

const tipSlice = createSlice({
  name: "tip",
  initialState,
  reducers: {
    setTipValue(state, action: PayloadAction<number>) {
      state.value = action.payload;
    },
    resetTipValue: (state): void => {
      state.value = 0;
    },
  },
});

export const { setTipValue, resetTipValue } = tipSlice.actions;
export default tipSlice.reducer;
