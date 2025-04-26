import { store, RootState } from "./store";
import { resetBillValue, setBillValue } from "./slices/billSlice.ts";
import { resetTipValue, setTipValue } from "@/redux/slices/tipSlice.ts";
import {
  resetPeopleValue,
  setPeopleValue,
} from "@/redux/slices/peopleSlice.ts";

describe("Redux Store", (): void => {
  it("handles setBillValue correctly", (): void => {
    store.dispatch(setBillValue(500));

    const state: RootState = store.getState() as RootState;
    expect(state.bill.value).toEqual(500);
  });

  it("handles resetBillValue correctly", (): void => {
    store.dispatch(resetBillValue());

    const state: RootState = store.getState() as RootState;
    expect(state.bill.value).toEqual(0);
  });

  it("handles setTipValue correctly", (): void => {
    store.dispatch(setTipValue(500));

    const state: RootState = store.getState() as RootState;
    expect(state.tip.value).toEqual(500);
  });

  it("handles resetTipValue correctly", (): void => {
    store.dispatch(resetTipValue());

    const state: RootState = store.getState() as RootState;
    expect(state.tip.value).toEqual(0);
  });

  it("handles setPeopleValue correctly", (): void => {
    store.dispatch(setPeopleValue(5));

    const state: RootState = store.getState() as RootState;
    expect(state.people.value).toEqual(5);
  });

  it("handles resetPeopleValue correctly", (): void => {
    store.dispatch(resetPeopleValue());

    const state: RootState = store.getState() as RootState;
    expect(state.people.value).toEqual(-1);
  });

  it("retains the previous state when no action is dispatched", (): void => {
    const initialState: RootState = store.getState();
    store.dispatch({ type: "" });

    const newState: RootState = store.getState();
    expect(newState).toEqual(initialState);
  });
});
