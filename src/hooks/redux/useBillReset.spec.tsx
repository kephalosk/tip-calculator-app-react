import { render } from "@testing-library/react";
import { useSelector } from "react-redux";
import { selectBillValue, useBillReset } from "@/hooks/redux/useBillReset.ts";
import { RootState } from "@/redux/store.ts";

jest.mock("react-redux", (): { useSelector: jest.Mock } => ({
  useSelector: jest.fn(),
}));

describe("useBillReset Hook", (): void => {
  let triggerReset: boolean;
  const TestComponent = (): null => {
    triggerReset = useBillReset().triggerReset;
    return null;
  };

  it("sets triggerReset to true when billAmount is 0", (): void => {
    (useSelector as unknown as jest.Mock).mockReturnValueOnce(0);
    render(<TestComponent />);

    expect(triggerReset).toBe(true);
  });

  it("sets triggerReset to false when billAmount is not 0", (): void => {
    (useSelector as unknown as jest.Mock).mockReturnValueOnce(50);

    render(<TestComponent />);

    expect(triggerReset).toBe(false);
  });

  it("toggles triggerReset when billAmount changes from 0 to a non-zero value", (): void => {
    (useSelector as unknown as jest.Mock)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(50);

    render(<TestComponent />);

    expect(triggerReset).toBe(true);

    render(<TestComponent />);

    expect(triggerReset).toBe(false);
  });

  it("calls selectBillValue and returns the correct billAmount value from the store", (): void => {
    const billAmountExpected: number = 100;

    const state: RootState = {
      bill: { value: billAmountExpected },
      tip: { tipValue: 0 },
      people: { value: 0 },
    };

    const billAmount: number = selectBillValue(state);

    expect(billAmount).toBe(billAmountExpected);
  });
});
