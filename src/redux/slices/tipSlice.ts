import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TipState {
  tipValue: number;
}

const initialState: TipState = {
  tipValue: 0,
};

const tipSlice = createSlice({
  name: "tip",
  initialState,
  reducers: {
    setTipValue(state, action: PayloadAction<number>) {
      state.tipValue = action.payload;
    },
    resetTipValue: (state): void => {
      state.tipValue = 0;
    },
  },
});

export const { setTipValue, resetTipValue } = tipSlice.actions;
export default tipSlice.reducer;
