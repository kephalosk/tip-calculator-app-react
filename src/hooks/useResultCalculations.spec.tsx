import { render, screen } from "@testing-library/react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store.ts";
import calculateTotalAndTip from "@/globals/helper/calculateTotalAndTip.ts";
import {
  selectBillValue,
  selectPeopleValue,
  selectTipValue,
  useResultCalculations,
} from "@/hooks/useResultCalculations.ts";
import { EMPTY_STRING } from "@/globals/constants/constants.ts";

jest.mock(
  "react-redux",
  (): {
    useDispatch: jest.Mock;
    useSelector: jest.Mock;
  } => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
  }),
);

jest.mock(
  "@/globals/helper/calculateTotalAndTip.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

describe("useResultCalculations Hook", () => {
  const tipTotal: string = "100.00";
  const totalSum: string = "1000.00";

  const billAmount: number = 100;
  const tipAmount: number = 20;
  const peopleCount: number = 5;

  const mockState: RootState = {
    bill: { value: billAmount },
    tip: { value: tipAmount },
    people: { value: peopleCount },
  };

  beforeEach((): void => {
    (useSelector as unknown as jest.Mock).mockImplementation((selector) =>
      selector(mockState),
    );
    (calculateTotalAndTip as jest.Mock).mockReturnValue({
      tipTotal,
      totalSum,
    });
  });

  const tipTotalTestId: string = "tip-total";
  const totalSumTestId: string = "total-sum";
  const TestComponent = () => {
    const { tipTotal, totalSum } = useResultCalculations();
    return (
      <div>
        <div data-testid={tipTotalTestId}>{tipTotal}</div>
        <div data-testid={totalSumTestId}>{totalSum}</div>
      </div>
    );
  };

  it("returns tipTotal and totalSum correctly when values are provided", (): void => {
    render(<TestComponent />);

    const tipTotalElement: HTMLElement = screen.getByTestId(tipTotalTestId);
    const totalSumElement: HTMLElement = screen.getByTestId(totalSumTestId);

    expect(tipTotalElement).toHaveTextContent(tipTotal);
    expect(totalSumElement).toHaveTextContent(totalSum);
    expect(calculateTotalAndTip).toHaveBeenCalledWith(
      billAmount,
      tipAmount,
      peopleCount,
    );
  });

  it.each([
    ["bill", 0],
    ["tip", 0],
    ["people", -1],
  ])(
    "does not call calculateTotalAndTip if %s is %s",
    (field: string, value: number): void => {
      (useSelector as unknown as jest.Mock).mockImplementation((selector) =>
        selector({ ...mockState, [field]: value }),
      );
      render(<TestComponent />);

      const tipTotalElement: HTMLElement = screen.getByTestId(tipTotalTestId);
      const totalSumElement: HTMLElement = screen.getByTestId(totalSumTestId);

      expect(tipTotalElement).toHaveTextContent(EMPTY_STRING);
      expect(totalSumElement).toHaveTextContent(EMPTY_STRING);
      expect(calculateTotalAndTip).not.toHaveBeenCalled();
    },
  );

  it.each([
    ["bill", 100, selectBillValue],
    ["tip", 100, selectTipValue],
    ["people", 100, selectPeopleValue],
  ])(
    "calls %s and returns the correct value from the store",
    (
      field: string,
      value: number,
      selectValue: (state: RootState) => number,
    ): void => {
      const state: RootState = {
        bill: { value: billAmount },
        tip: { value: tipAmount },
        people: { value: peopleCount },
        [field]: { value },
      };

      const amount: number = selectValue(state);

      expect(amount).toEqual(value);
    },
  );
});
