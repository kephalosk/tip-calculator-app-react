import { store } from "./store"; // Importiere den Store
import { setBillValue } from "./billSlice";
import { RootState } from "./store";

describe("Redux Store", (): void => {
  it("should handle actions correctly", (): void => {
    store.dispatch(setBillValue(500));

    const state: RootState = store.getState() as RootState;
    expect(state.bill.value).toEqual(500);
  });

  it("should retain the previous state when no action is dispatched", (): void => {
    const initialState: RootState = store.getState();
    store.dispatch({ type: "" });

    const newState: RootState = store.getState();
    expect(newState).toEqual(initialState);
  });
});
