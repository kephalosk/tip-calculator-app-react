import { render, fireEvent } from "@testing-library/react";
import Input, { InputProps } from "./Input";
import { useCursorPositionInCaseOfPercentage } from "@/hooks/useCursorPositionInCaseOfPercentage.ts";
import useControlledNumericInput from "@/hooks/useControlledNumericInput.ts";
import useInputReset from "@/hooks/redux/useInputReset.ts";

jest.mock("@/hooks/useControlledNumericInput");
jest.mock("@/hooks/useCursorPositionInCaseOfPercentage");
jest.mock("@/hooks/redux/useInputReset.ts");

describe("Input", (): void => {
  const id: string = "amount";
  const name: string = "amount";
  const maxValue: number = 100;
  const propagateValueMock: jest.Mock = jest.fn();
  const placeholder: string = "Enter amount";
  const allowDecimals: boolean = false;
  const hasError: boolean = false;
  const withPercentageSign: boolean = false;

  const setup = (
    propsOverride = {},
  ): { input: HTMLElement | null; propagateValueMock: jest.Mock } => {
    const defaultProps: InputProps = {
      id,
      name,
      maxValue,
      propagateValue: propagateValueMock,
      placeholder,
      allowDecimals,
      hasError,
      withPercentageSign,
    };

    const props: InputProps = { ...defaultProps, ...propsOverride };
    const { container } = render(<Input {...props} />);
    const input: HTMLElement | null = container.querySelector(".input");
    return { input, propagateValueMock };
  };

  const mockedValue: string = "421";
  const handleInputChangeMock: jest.Mock = jest.fn(() =>
    propagateValueMock(mockedValue),
  );

  const handleCursorPositionMock: jest.Mock = jest.fn();
  const setSelectionRangeMock: jest.Mock = jest.fn();
  const selectionStart: number = 4;
  const mockedInputRef: {
    current: {
      selectionStart: number;
      setSelectionRange: jest.Mock;
    };
  } = {
    current: {
      selectionStart,
      setSelectionRange: setSelectionRangeMock,
    },
  };

  beforeEach((): void => {
    (useControlledNumericInput as jest.Mock).mockReturnValue({
      value: mockedValue,
      handleInputChange: handleInputChangeMock,
    });
    (useCursorPositionInCaseOfPercentage as jest.Mock).mockReturnValue({
      handleCursorPosition: handleCursorPositionMock,
      inputRef: mockedInputRef,
    });
    (useInputReset as jest.Mock).mockReturnValue(undefined);
  });

  it("renders with correct placeholder and value", (): void => {
    const { input } = setup();

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("placeholder", placeholder);
    expect(input).toHaveValue(mockedValue);
  });

  it("uses default values", () => {
    const { input } = setup({
      placeholder: undefined,
      allowDecimals: undefined,
      hasError: undefined,
      withPercentageSign: undefined,
    });

    expect(input).toHaveAttribute("placeholder", "");
    expect(input).toHaveAttribute("pattern", "^\\d*$");
    expect(input).not.toHaveClass("error");
    expect(input).not.toHaveTextContent("%");
  });

  it("calls handleInputChange when value changes", (): void => {
    const { input } = setup();

    fireEvent.change(input!, { target: { value: "42" } });

    expect(handleInputChangeMock).toHaveBeenCalledWith(
      "42",
      expect.objectContaining({}),
    );
  });

  it("propagates value when input changes", (): void => {
    const { input, propagateValueMock } = setup();

    fireEvent.change(input!, { target: { value: "1500" } });

    expect(propagateValueMock).toHaveBeenCalledWith(mockedValue);
  });

  it("calls handleCursorPosition when input changes and withPercentageSign is true", () => {
    const { input } = setup();

    fireEvent.input(input!, { target: { value: mockedValue } });

    expect(handleCursorPositionMock).toHaveBeenCalledWith(mockedValue);
  });

  it("applies error class when hasError is true", (): void => {
    const { input } = setup({ hasError: true });

    expect(input).toHaveClass("error");
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it("does not apply aria-label if placeholder exists", (): void => {
    const { input } = setup({ placeholder: "Test" });

    expect(input).not.toHaveAttribute("aria-label");
  });

  it("applies aria-label if placeholder is missing", (): void => {
    const { input } = setup({ placeholder: "" });

    expect(input).toHaveAttribute("aria-label", "Input field for amount");
  });

  it("has correct input attributes", (): void => {
    const { input } = setup({ allowDecimals: true });

    expect(input).toHaveAttribute("type", "text");
    expect(input).toHaveAttribute("inputmode", "decimal");
    expect(input).toHaveAttribute("autocomplete", "off");
    expect(input).toHaveAttribute("pattern", "^\\d+(\\.\\d{0,2})?$");
  });

  it("applies percentage sign to the value if withPercentageSign is true", () => {
    const { input } = setup({ withPercentageSign: true });

    fireEvent.change(input!, { target: { value: mockedValue } });

    expect(input).toHaveValue(`${mockedValue}%`);
  });

  it("does not apply percentage sign to the value if withPercentageSign is true", () => {
    const { input } = setup({ withPercentageSign: false });

    fireEvent.change(input!, { target: { value: mockedValue } });

    expect(input).toHaveValue(mockedValue);
  });
});
