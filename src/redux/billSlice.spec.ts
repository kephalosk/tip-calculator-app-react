import billReducer, { BillState, setBillValue } from "./billSlice";

describe("billSlice", (): void => {
  const initialState: { value: number } = { value: 0 };

  it("should return the initial state", (): void => {
    expect(billReducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("should handle setting the bill value", (): void => {
    const newValue: number = 100;
    const action: { payload: number; type: "bill/setBillValue" } =
      setBillValue(newValue);
    const nextState: BillState = billReducer(initialState, action);

    expect(nextState.value).toEqual(newValue);
  });

  it("should handle updating the bill value multiple times", (): void => {
    const action1: { payload: number; type: "bill/setBillValue" } =
      setBillValue(200);
    const state1: BillState = billReducer(initialState, action1);
    const action2: { payload: number; type: "bill/setBillValue" } =
      setBillValue(300);
    const state2: BillState = billReducer(state1, action2);

    expect(state1.value).toEqual(200);
    expect(state2.value).toEqual(300);
  });
});
