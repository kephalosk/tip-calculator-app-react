import { renderHook, act } from "@testing-library/react";
import useControlledNumericInput from "./useControlledNumericInput";

describe("useControlledNumericInput", (): void => {
  const setup = (options?: {
    maxValue?: number;
    allowDecimals?: boolean;
  }): {
    result: {
      current: { value: string; handleInputChange: (newValue: string) => void };
    };
    propagateValue: jest.Mock;
  } => {
    const propagateValue: jest.Mock = jest.fn();
    const { result } = renderHook(() =>
      useControlledNumericInput({
        maxValue: options?.maxValue ?? 100,
        allowDecimals: options?.allowDecimals ?? false,
        propagateValue,
      }),
    );

    return { result, propagateValue };
  };

  it("initializes with empty string", (): void => {
    const { result } = setup();

    expect(result.current.value).toBe("");
  });

  it("sets value and calls propagateValue with number input (integers)", (): void => {
    const { result, propagateValue } = setup();

    act((): void => {
      result.current.handleInputChange("42");
    });

    expect(result.current.value).toBe("42");
    expect(propagateValue).toHaveBeenCalledWith(42);
  });

  it("calls propagateValue with 0 and resets value when input is empty", (): void => {
    const { result, propagateValue } = setup();

    act((): void => {
      result.current.handleInputChange("");
    });

    expect(result.current.value).toBe("");
    expect(propagateValue).toHaveBeenCalledWith(0);
  });

  it("calls propagateValue with 0 and resets value when input is 0", (): void => {
    const { result, propagateValue } = setup();

    act((): void => {
      result.current.handleInputChange("0");
    });

    expect(result.current.value).toBe("0");
    expect(propagateValue).toHaveBeenCalledWith(0);
  });

  it("does nothing if input is invalid (non-numeric)", (): void => {
    const { result, propagateValue } = setup();

    act((): void => {
      result.current.handleInputChange("abc");
    });

    expect(result.current.value).toBe("");
    expect(propagateValue).not.toHaveBeenCalled();
  });

  it("clamps value to maxValue if input exceeds it", (): void => {
    const { result, propagateValue } = setup({ maxValue: 50 });

    act((): void => {
      result.current.handleInputChange("100");
    });

    expect(result.current.value).toBe("50");
    expect(propagateValue).toHaveBeenCalledWith(50);
  });

  it("accepts decimals when allowed", (): void => {
    const { result, propagateValue } = setup({ allowDecimals: true });

    act((): void => {
      result.current.handleInputChange("12.34");
    });

    expect(result.current.value).toBe("12.34");
    expect(propagateValue).toHaveBeenCalledWith(12.34);
  });

  it("rejects decimal input if allowDecimals is false", (): void => {
    const { result, propagateValue } = setup({ allowDecimals: false });

    act((): void => {
      result.current.handleInputChange("10.5");
    });

    expect(result.current.value).toBe("");
    expect(propagateValue).not.toHaveBeenCalled();
  });

  it("rejects decimals with more than 2 digits", (): void => {
    const { result, propagateValue } = setup({ allowDecimals: true });

    act((): void => {
      result.current.handleInputChange("9.999");
    });

    expect(result.current.value).toBe("");
    expect(propagateValue).not.toHaveBeenCalled();
  });

  it("accepts input ending with decimal point (e.g. 100.)", (): void => {
    const { result, propagateValue } = setup({ allowDecimals: true });

    act((): void => {
      result.current.handleInputChange("10.");
    });

    expect(result.current.value).toBe("10.");
    expect(propagateValue).toHaveBeenCalledWith(10);
  });
});
