import tipReducer, { resetTipValue, setTipValue, TipState } from "./tipSlice";
import {
  configureStore,
  EnhancedStore,
  StoreEnhancer,
  ThunkDispatch,
  Tuple,
  UnknownAction,
} from "@reduxjs/toolkit";

const store: EnhancedStore<
  { tip: TipState },
  UnknownAction,
  Tuple<
    [
      StoreEnhancer<{
        dispatch: ThunkDispatch<{ tip: TipState }, undefined, UnknownAction>;
      }>,
      StoreEnhancer,
    ]
  >
> = configureStore({
  reducer: {
    tip: tipReducer,
  },
});

describe("tipSlice", (): void => {
  it("returns the initial state", () => {
    const initialState: TipState = {
      value: 0,
    };

    const state: TipState = store.getState().tip;

    expect(state).toEqual(initialState);
  });

  it("handles setTipValue", (): void => {
    store.dispatch(setTipValue(0.15));

    const state: TipState = store.getState().tip;

    expect(state.value).toEqual(0.15);
  });

  it("updates value when setTipValue is called", (): void => {
    store.dispatch(setTipValue(0.1));
    const stateAfterFirstDispatch: TipState = store.getState().tip;

    expect(stateAfterFirstDispatch.value).toBe(0.1);

    store.dispatch(setTipValue(0.25));
    const stateAfterSecondDispatch: TipState = store.getState().tip;

    expect(stateAfterSecondDispatch.value).toBe(0.25);
  });

  it("handles 0 as a valid value", (): void => {
    store.dispatch(setTipValue(0));

    const state: TipState = store.getState().tip;

    expect(state.value).toBe(0);
  });

  it("handles large numbers", (): void => {
    store.dispatch(setTipValue(1000));

    const state: TipState = store.getState().tip;

    expect(state.value).toBe(1000);
  });

  it("handles resetting the tip value", (): void => {
    store.dispatch(resetTipValue());

    const state: TipState = store.getState().tip;

    expect(state.value).toEqual(0);
  });
});
