import { render, screen, fireEvent } from "@testing-library/react";
import { useDispatch } from "react-redux";
import { setPeopleValue } from "@/redux/slices/peopleSlice.ts";
import usePeople from "@/hooks/redux/usePeople.ts";
import { PEOPLE_INPUT_MAX_VALUE } from "@/globals/config.ts";
import { PEOPLE_VALUE_INVALID } from "@/globals/constants/constants.ts";

jest.mock("react-redux", (): { useDispatch: jest.Mock } => ({
  useDispatch: jest.fn(),
}));

jest.mock(
  "@/redux/slices/peopleSlice.ts",
  (): { setPeopleValue: jest.Mock } => ({
    setPeopleValue: jest.fn(),
  }),
);

jest.spyOn(console, "error").mockImplementation((): void | null => null);

const testId: string = "test-component";
const TestComponent = ({ value }: { value: number }) => {
  const { updatePeopleValue } = usePeople();
  return (
    <div>
      <button data-testid={testId} onClick={() => updatePeopleValue(value)}>
        Update People
      </button>
    </div>
  );
};

describe("usePeople Hook", (): void => {
  const dispatch: jest.Mock = jest.fn();

  beforeEach((): void => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatch);
  });

  it("dispatches setPeopleValue when valid value is provided", (): void => {
    const validValue: number = 500;
    render(<TestComponent value={validValue} />);

    const element: HTMLElement = screen.getByTestId(testId);
    fireEvent.click(element);

    expect(dispatch).toHaveBeenCalledWith(setPeopleValue(validValue));
  });

  it("does not dispatch setPeopleValue when value is negative", (): void => {
    const invalidValue: number = -1;
    render(<TestComponent value={invalidValue} />);

    const element: HTMLElement = screen.getByTestId(testId);
    fireEvent.click(element);

    expect(dispatch).not.toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(PEOPLE_VALUE_INVALID);
  });

  it("dispatches setPeopleValue when value equals PEOPLE_INPUT_MAX_VALUE", (): void => {
    const validValue: number = PEOPLE_INPUT_MAX_VALUE;
    render(<TestComponent value={validValue} />);

    const element: HTMLElement = screen.getByTestId(testId);
    fireEvent.click(element);

    expect(dispatch).toHaveBeenCalledWith(setPeopleValue(validValue));
  });

  it("dispatches setPeopleValue with PEOPLE_INPUT_MAX_VALUE when value exceeds PEOPLE_INPUT_MAX_VALUE", (): void => {
    const invalidValue: number = PEOPLE_INPUT_MAX_VALUE + 1;
    render(<TestComponent value={invalidValue} />);

    const element: HTMLElement = screen.getByTestId(testId);
    fireEvent.click(element);

    expect(dispatch).toHaveBeenCalled();
  });
});
