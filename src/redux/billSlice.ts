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
  },
});

export const { setBillValue } = billSlice.actions;
export default billSlice.reducer;
