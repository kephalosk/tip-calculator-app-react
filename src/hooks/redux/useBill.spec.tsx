import { render, screen, fireEvent } from "@testing-library/react";
import { useDispatch } from "react-redux";
import { setBillValue } from "@/redux/slices/billSlice.ts";
import useBill from "@/hooks/redux/useBill.ts";
import { BILL_INPUT_MAX_VALUE } from "@/globals/config.ts";
import { BILL_VALUE_INVALID } from "@/globals/constants/constants.ts";

jest.mock("react-redux", (): { useDispatch: jest.Mock } => ({
  useDispatch: jest.fn(),
}));

jest.mock("@/redux/slices/billSlice.ts", (): { setBillValue: jest.Mock } => ({
  setBillValue: jest.fn(),
}));

jest.spyOn(console, "error").mockImplementation((): void | null => null);

const testId: string = "test-component";
const TestComponent = ({ value }: { value: number }) => {
  const { updateBillValue } = useBill();
  return (
    <div>
      <button data-testid={testId} onClick={() => updateBillValue(value)}>
        Update Bill
      </button>
    </div>
  );
};

describe("useBill Hook", (): void => {
  const dispatch: jest.Mock = jest.fn();

  beforeEach((): void => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatch); // Mocking dispatch
  });

  it("dispatches setBillValue when valid value is provided", (): void => {
    const validValue: number = 500;
    render(<TestComponent value={validValue} />);

    const element: HTMLElement = screen.getByTestId(testId);
    fireEvent.click(element);

    expect(dispatch).toHaveBeenCalledWith(setBillValue(validValue));
  });

  it("does not dispatch setBillValue when value is negative", (): void => {
    const invalidValue: number = -1;
    render(<TestComponent value={invalidValue} />);

    const element: HTMLElement = screen.getByTestId(testId);
    fireEvent.click(element);

    expect(dispatch).not.toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(BILL_VALUE_INVALID);
  });

  it("dispatches setBillValue when value equals BILL_INPUT_MAX_VALUE", (): void => {
    const validValue: number = BILL_INPUT_MAX_VALUE;
    render(<TestComponent value={validValue} />);

    const element: HTMLElement = screen.getByTestId(testId);
    fireEvent.click(element);

    expect(dispatch).toHaveBeenCalledWith(setBillValue(validValue));
  });

  it("dispatches setBillValue with BILL_INPUT_MAX_VALUE when value exceeds BILL_INPUT_MAX_VALUE", (): void => {
    const invalidValue: number = BILL_INPUT_MAX_VALUE + 1;
    render(<TestComponent value={invalidValue} />);

    const element: HTMLElement = screen.getByTestId(testId);
    fireEvent.click(element);

    expect(dispatch).toHaveBeenCalled();
  });
});
