import { fireEvent, render } from "@testing-library/react";
import Input, { InputProps } from "./Input";
import { useCursorPositionInCaseOfPercentage } from "@/hooks/useCursorPositionInCaseOfPercentage.ts";
import { useControlledNumericInput } from "@/hooks/useControlledNumericInput.ts";
import { useInputReset } from "@/hooks/redux/useInputReset.ts";
import {
  INPUT_ARIA_LABEL_PREFIX,
  REGEXP_FOR_DECIMALS,
  REGEXP_FOR_WHOLE_NUMBERS,
} from "@/globals/constants/constants.ts";

jest.mock(
  "@/hooks/useControlledNumericInput",
  (): {
    __esModule: boolean;
    useControlledNumericInput: jest.Mock;
  } => ({
    __esModule: true,
    useControlledNumericInput: jest.fn(),
  }),
);

jest.mock(
  "@/hooks/useCursorPositionInCaseOfPercentage",
  (): {
    __esModule: boolean;
    useCursorPositionInCaseOfPercentage: jest.Mock;
  } => ({
    __esModule: true,
    useCursorPositionInCaseOfPercentage: jest.fn(),
  }),
);

jest.mock(
  "@/hooks/redux/useInputReset.ts",
  (): {
    __esModule: boolean;
    useInputReset: jest.Mock;
  } => ({
    __esModule: true,
    useInputReset: jest.fn(),
  }),
);

describe("Input", (): void => {
  const id: string = "amount";
  const name: string = "amount";
  const maxValue: number = 100;
  const propagateValueMock: jest.Mock = jest.fn();
  const placeholder: string = "Enter amount";
  const allowDecimals: boolean = false;
  const hasError: boolean = false;
  const withPercentageSign: boolean = false;
  const triggerReset: boolean = false;

  const defaultPlaceholder: string = "";
  const defaultHasError: boolean = false;

  const changedValue: string = "123";

  const setup = (
    propsOverride?: Partial<InputProps>,
  ): { container: HTMLElement } => {
    const defaultProps: InputProps = {
      id,
      name,
      maxValue,
      propagateValue: propagateValueMock,
      placeholder,
      allowDecimals,
      hasError,
      withPercentageSign,
      triggerReset,
    };

    const props: InputProps = { ...defaultProps, ...propsOverride };

    return render(<Input {...props} />);
  };

  const mockedValue: string = "421";
  const handleInputChangeMock: jest.Mock = jest.fn();
  const useControlledNumericInputMock = {
    value: mockedValue,
    handleInputChange: handleInputChangeMock,
  };

  const setSelectionRangeMock: jest.Mock = jest.fn();
  const selectionStart: number = 4;
  const mockedInputRef = {
    current: {
      selectionStart,
      setSelectionRange: setSelectionRangeMock,
    },
  };
  const handleCursorPositionMock: jest.Mock = jest.fn();
  const useCursorPositionInCaseOfPercentageMock = {
    inputRef: mockedInputRef,
    handleCursorPosition: handleCursorPositionMock,
  };

  beforeEach((): void => {
    (useControlledNumericInput as jest.Mock).mockReturnValue(
      useControlledNumericInputMock,
    );
    (useCursorPositionInCaseOfPercentage as jest.Mock).mockReturnValue(
      useCursorPositionInCaseOfPercentageMock,
    );
    (useInputReset as jest.Mock).mockReturnValue(undefined);
  });

  it("renders input with correct placeholder and value", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(".input");

    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute("aria-invalid", `${hasError}`);
    expect(element).toHaveAttribute("autoComplete", "off");
    expect(element).toHaveAttribute("id", `${id}`);
    expect(element).toHaveAttribute("inputMode", "decimal");
    expect(element).toHaveAttribute("name", `${name}`);
    expect(element).toHaveAttribute("pattern", REGEXP_FOR_WHOLE_NUMBERS);
    expect(element).toHaveAttribute("placeholder", placeholder);
    expect(element).toHaveAttribute("type", "text");
    expect(element).toHaveValue(mockedValue);
  });

  it("renders class error if prop hasError is true", (): void => {
    const { container } = setup({ hasError: true });

    const element: HTMLElement | null = container.querySelector(".input");

    expect(element).toBeInTheDocument();
    expect(element).toHaveClass("error");
  });

  it("renders with percentage if prop withPercentageSign is true", (): void => {
    const { container } = setup({ withPercentageSign: true });

    const element: HTMLElement | null = container.querySelector(".input");

    expect(element).toBeInTheDocument();
    expect(element).toHaveValue(`${mockedValue}%`);
  });

  it("allows decimals if prop allowDecimals is true", (): void => {
    const { container } = setup({ allowDecimals: true });

    const element: HTMLElement | null = container.querySelector(".input");

    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute("pattern", REGEXP_FOR_DECIMALS);
  });

  it("sets aria-label if prop placeholder is undefined", (): void => {
    const { container } = setup({ placeholder: undefined });

    const element: HTMLElement | null = container.querySelector(".input");

    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute(
      "aria-label",
      `${INPUT_ARIA_LABEL_PREFIX}${name}`,
    );
  });

  it("sets default values if optional props are undefined", (): void => {
    const { container } = setup({
      placeholder: undefined,
      allowDecimals: undefined,
      hasError: undefined,
      withPercentageSign: undefined,
      triggerReset: undefined,
    });

    const element: HTMLElement | null = container.querySelector(".input");

    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute("placeholder", defaultPlaceholder);
    expect(element).toHaveAttribute("pattern", REGEXP_FOR_WHOLE_NUMBERS);
    expect(element).toHaveAttribute("aria-invalid", `${defaultHasError}`);
    expect(element).toHaveValue(mockedValue);
  });

  it("calls handleInputChange when value changes", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(".input");
    fireEvent.change(element!, { target: { value: changedValue } });

    expect(handleInputChangeMock).toHaveBeenCalledTimes(1);
    expect(handleInputChangeMock).toHaveBeenCalledWith(
      changedValue,
      expect.objectContaining({}),
    );
  });

  it("calls handleCursorPosition when input changes and withPercentageSign is true", () => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(".input");
    fireEvent.input(element!, { target: { value: changedValue } });

    expect(handleCursorPositionMock).toHaveBeenCalledTimes(1);
    expect(handleCursorPositionMock).toHaveBeenCalledWith(changedValue);
  });

  it("calls hook useControlledNumericInput with correct props", (): void => {
    setup();

    expect(useControlledNumericInput).toHaveBeenCalledTimes(1);
    expect(useControlledNumericInput).toHaveBeenCalledWith({
      allowDecimals,
      maxValue,
      propagateValue: propagateValueMock,
    });
  });

  it("calls hook useCursorPositionInCaseOfPercentage with correct props", (): void => {
    setup();

    expect(useCursorPositionInCaseOfPercentage).toHaveBeenCalledTimes(1);
    expect(useCursorPositionInCaseOfPercentage).toHaveBeenCalledWith(
      withPercentageSign,
    );
  });

  it("calls hook useInputReset with correct props", (): void => {
    setup();

    expect(useInputReset).toHaveBeenCalledTimes(1);
    expect(useInputReset).toHaveBeenCalledWith(
      triggerReset,
      handleInputChangeMock,
    );
  });
});
