import peopleReducer, { PeopleState, setPeopleValue } from "./peopleSlice.ts";

describe("peopleSlice", (): void => {
  const initialState: { value: number } = { value: 0 };

  it("returns the initial state", (): void => {
    expect(peopleReducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("handles setting the people value", (): void => {
    const newValue: number = 100;
    const action: { payload: number; type: "people/setPeopleValue" } =
      setPeopleValue(newValue);
    const nextState: PeopleState = peopleReducer(initialState, action);

    expect(nextState.value).toEqual(newValue);
  });

  it("handles updating the bill value multiple times", (): void => {
    const action1: { payload: number; type: "people/setPeopleValue" } =
      setPeopleValue(200);
    const state1: PeopleState = peopleReducer(initialState, action1);
    const action2: { payload: number; type: "people/setPeopleValue" } =
      setPeopleValue(300);
    const state2: PeopleState = peopleReducer(state1, action2);

    expect(state1.value).toEqual(200);
    expect(state2.value).toEqual(300);
  });
});
