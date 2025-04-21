import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PeopleState {
  value: number;
}

const initialState: PeopleState = {
  value: 0,
};

const peopleSlice = createSlice({
  name: "people",
  initialState,
  reducers: {
    setPeopleValue: (state, action: PayloadAction<number>): void => {
      state.value = action.payload;
    },
    resetPeopleValue: (state): void => {
      state.value = 0;
    },
  },
});

export const { setPeopleValue, resetPeopleValue } = peopleSlice.actions;
export default peopleSlice.reducer;
