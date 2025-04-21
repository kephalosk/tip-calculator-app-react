import { configureStore } from "@reduxjs/toolkit";
import billReducer from "./slices/billSlice.ts";
import tipReducer from "./slices/tipSlice.ts";
import peopleReducer from "./slices/peopleSlice.ts";

export const store = configureStore({
  reducer: {
    bill: billReducer,
    tip: tipReducer,
    people: peopleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
