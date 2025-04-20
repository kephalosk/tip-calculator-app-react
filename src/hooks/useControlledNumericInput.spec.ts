import { renderHook, act } from "@testing-library/react";
import useControlledNumericInput from "./useControlledNumericInput";

describe("useControlledNumericInput", (): void => {
  const maxValue: number = 100;
  const allowDecimals: boolean = false;
  const propagateValue: jest.Mock = jest.fn();

  const setup = (options?: {
    maxValue?: number;
    allowDecimals?: boolean;
  }): {
    result: {
      current: { value: string; handleInputChange: (newValue: string) => void };
    };
    propagateValue: jest.Mock;
  } => {
    const { result } = renderHook(() =>
      useControlledNumericInput({
        maxValue: options?.maxValue ?? maxValue,
        allowDecimals: options?.allowDecimals ?? allowDecimals,
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
    expect(propagateValue).toHaveBeenCalledWith(42, undefined);
  });

  it("calls propagateValue with 0 and resets value when input is empty", (): void => {
    const { result, propagateValue } = setup();

    act((): void => {
      result.current.handleInputChange("");
    });

    expect(result.current.value).toBe("");
    expect(propagateValue).toHaveBeenCalledWith(0, undefined);
  });

  it("calls propagateValue with 0 and resets value when input is 0", (): void => {
    const { result, propagateValue } = setup();

    act((): void => {
      result.current.handleInputChange("0");
    });

    expect(result.current.value).toBe("0");
    expect(propagateValue).toHaveBeenCalledWith(0, undefined);
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
    expect(propagateValue).toHaveBeenCalledWith(50, undefined);
  });

  it("accepts decimals when allowed", (): void => {
    const { result, propagateValue } = setup({ allowDecimals: true });

    act((): void => {
      result.current.handleInputChange("12.34");
    });

    expect(result.current.value).toBe("12.34");
    expect(propagateValue).toHaveBeenCalledWith(12.34, undefined);
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
    expect(propagateValue).toHaveBeenCalledWith(10, undefined);
  });

  it("removes percentage sign %", (): void => {
    const { result, propagateValue } = setup();

    act((): void => {
      result.current.handleInputChange("10%");
    });

    expect(result.current.value).toBe("10");
    expect(propagateValue).toHaveBeenCalledWith(10, undefined);
  });

  it("keeps 0", (): void => {
    const { result, propagateValue } = setup();

    act((): void => {
      result.current.handleInputChange("0");
    });

    expect(result.current.value).toBe("0");
    expect(propagateValue).toHaveBeenCalledWith(0, undefined);
  });

  it("keeps 0.", (): void => {
    const { result, propagateValue } = setup();

    act((): void => {
      result.current.handleInputChange("0.");
    });

    expect(result.current.value).toBe("0.");
    expect(propagateValue).toHaveBeenCalledWith(0, undefined);
  });

  it("keeps 0.**", (): void => {
    const { result, propagateValue } = setup({ allowDecimals: true });

    act((): void => {
      result.current.handleInputChange("0.99");
    });

    expect(result.current.value).toBe("0.99");
    expect(propagateValue).toHaveBeenCalledWith(0.99, undefined);
  });

  it("removes leading 0", (): void => {
    const { result, propagateValue } = setup();

    act((): void => {
      result.current.handleInputChange("00001");
    });

    expect(result.current.value).toBe("1");
    expect(propagateValue).toHaveBeenCalledWith(1, undefined);
  });

  it("returns 0 for string of zeros", (): void => {
    const { result, propagateValue } = setup();

    act((): void => {
      result.current.handleInputChange("00000");
    });

    expect(result.current.value).toBe("0");
    expect(propagateValue).toHaveBeenCalledWith(0, undefined);
  });

  it("sets default when allowDecimals is undefined", (): void => {
    const { result } = renderHook(() =>
      useControlledNumericInput({
        maxValue,
        allowDecimals: undefined,
        propagateValue,
      }),
    );

    act((): void => {
      result.current.handleInputChange("1.99");
    });

    expect(result.current.value).toBe("");
    expect(propagateValue).not.toHaveBeenCalled();
  });
});
