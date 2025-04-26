import { render } from "@testing-library/react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store.ts";
import {
  selectPeopleValue,
  usePeopleReset,
} from "@/hooks/redux/usePeopleReset.ts";

jest.mock("react-redux", (): { useSelector: jest.Mock } => ({
  useSelector: jest.fn(),
}));

describe("usePeopleReset Hook", (): void => {
  let triggerReset: boolean;
  const TestComponent = (): null => {
    triggerReset = usePeopleReset().triggerReset;
    return null;
  };

  it("sets triggerReset to true when peopleAmount is 0", (): void => {
    (useSelector as unknown as jest.Mock).mockReturnValueOnce(0);
    render(<TestComponent />);

    expect(triggerReset).toBe(true);
  });

  it("sets triggerReset to false when peopleAmount is not 0", (): void => {
    (useSelector as unknown as jest.Mock).mockReturnValueOnce(50);

    render(<TestComponent />);

    expect(triggerReset).toBe(false);
  });

  it("toggles triggerReset when peopleAmount changes from 0 to a non-zero value", (): void => {
    (useSelector as unknown as jest.Mock)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(50);

    render(<TestComponent />);

    expect(triggerReset).toBe(true);

    render(<TestComponent />);

    expect(triggerReset).toBe(false);
  });

  it("calls peopleAmount and returns the correct peopleAmount value from the store", (): void => {
    const peopleAmountExpected: number = 100;

    const state: RootState = {
      bill: { value: 0 },
      tip: { value: 0 },
      people: { value: peopleAmountExpected },
    };

    const peopleAmount: number = selectPeopleValue(state);

    expect(peopleAmount).toBe(peopleAmountExpected);
  });
});
