import { render, fireEvent } from "@testing-library/react";
import { useDispatch } from "react-redux";
import { useInputValue } from "./useInputValue.ts";
import { setTipValue } from "@/redux/slices/tipSlice.ts";
import React from "react";

jest.mock("react-redux", (): { useDispatch: jest.Mock } => ({
  useDispatch: jest.fn(),
}));

const TestComponent = ({
  deactivateAllItems,
}: {
  deactivateAllItems: () => void;
}) => {
  const { handleInputChange } = useInputValue(deactivateAllItems);

  return (
    <input
      type="text"
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        handleInputChange(parseFloat(e.target.value), e)
      }
    />
  );
};

const TestComponentEventUndefined = ({
  deactivateAllItems,
}: {
  deactivateAllItems: () => void;
}) => {
  const { handleInputChange } = useInputValue(deactivateAllItems);

  return (
    <input
      type="text"
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        handleInputChange(parseFloat(e.target.value), undefined)
      }
    />
  );
};

describe("useInputValue Hook", (): void => {
  const dispatch: jest.Mock = jest.fn();
  const deactivateAllItems: jest.Mock = jest.fn();
  const inputValue: number = 0.1;

  beforeEach((): void => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatch);
  });

  it("should call deactivateAllItems and dispatch setTipValue on handleInputChange", (): void => {
    const { getByRole } = render(
      <TestComponent deactivateAllItems={deactivateAllItems} />,
    );

    const input: HTMLElement = getByRole("textbox");

    fireEvent.change(input, { target: { value: inputValue.toString() } });

    expect(deactivateAllItems).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(setTipValue(inputValue));
  });

  it("should not call deactivateAllItems if no event is provided", (): void => {
    const { getByRole } = render(
      <TestComponentEventUndefined deactivateAllItems={deactivateAllItems} />,
    );

    const input: HTMLElement = getByRole("textbox");
    fireEvent.change(input, { target: { value: inputValue.toString() } });

    expect(deactivateAllItems).not.toHaveBeenCalled();
  });
});
