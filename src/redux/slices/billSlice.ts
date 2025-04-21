import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BillState {
  value: number;
}

const initialState: BillState = {
  value: 0,
};

const billSlice = createSlice({
  name: "bill",
  initialState,
  reducers: {
    setBillValue: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
    resetBillValue: (state): void => {
      state.value = 0;
    },
  },
});

export const { setBillValue, resetBillValue } = billSlice.actions;
export default billSlice.reducer;
