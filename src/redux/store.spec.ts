import { store, RootState } from "./store";
import { setBillValue } from "./slices/billSlice.ts";
import { setTipValue } from "@/redux/slices/tipSlice.ts";

describe("Redux Store", (): void => {
  it("handles setBillValue correctly", (): void => {
    store.dispatch(setBillValue(500));

    const state: RootState = store.getState() as RootState;
    expect(state.bill.value).toEqual(500);
  });

  it("handles setTipValue correctly", (): void => {
    store.dispatch(setTipValue(500));

    const state: RootState = store.getState() as RootState;
    expect(state.tip.tipValue).toEqual(500);
  });

  it("retains the previous state when no action is dispatched", (): void => {
    const initialState: RootState = store.getState();
    store.dispatch({ type: "" });

    const newState: RootState = store.getState();
    expect(newState).toEqual(initialState);
  });
});
