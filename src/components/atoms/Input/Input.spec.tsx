import { render, screen, fireEvent } from "@testing-library/react";
import Input from "./Input";

describe("Input", (): void => {
  const setup = (
    propsOverride = {},
  ): { input: HTMLElement; propagateValue: jest.Mock } => {
    const propagateValue: jest.Mock = jest.fn();
    const defaultProps: {
      id: string;
      name: string;
      maxValue: number;
      placeholder: string;
      propagateValue: jest.Mock;
      allowDecimals: boolean;
      hasError: boolean;
    } = {
      id: "amount",
      name: "amount",
      maxValue: 100,
      placeholder: "Enter amount",
      propagateValue,
      allowDecimals: false,
      hasError: false,
    };

    const props = { ...defaultProps, ...propsOverride };
    render(<Input {...props} />);
    const input: HTMLElement = screen.getByRole("textbox");
    return { input, propagateValue };
  };

  it("renders with correct placeholder and value", (): void => {
    const { input } = setup();

    expect(input).toHaveAttribute("placeholder", "Enter amount");
    expect(input).toHaveValue("");
  });

  it("calls propagateValue on valid integer input", (): void => {
    const { input, propagateValue } = setup();

    fireEvent.change(input, { target: { value: "42" } });

    expect(propagateValue).toHaveBeenCalledWith(42);
  });

  it("respects maxValue", (): void => {
    const { input, propagateValue } = setup({ maxValue: 10 });

    fireEvent.change(input, { target: { value: "15" } });

    expect(propagateValue).toHaveBeenCalledWith(10);
  });

  it("ignores invalid input when allowDecimals is false", (): void => {
    const { input, propagateValue } = setup({ allowDecimals: false });

    fireEvent.change(input, { target: { value: "10.5" } });

    expect(propagateValue).not.toHaveBeenCalled();
  });

  it("accepts decimal input when allowDecimals is true", (): void => {
    const { input, propagateValue } = setup({ allowDecimals: true });

    fireEvent.change(input, { target: { value: "10.25" } });

    expect(propagateValue).toHaveBeenCalledWith(10.25);
  });

  it("rejects decimal input with more than two digits after decimal", (): void => {
    const { input, propagateValue } = setup({ allowDecimals: true });

    fireEvent.change(input, { target: { value: "5.123" } });

    expect(propagateValue).not.toHaveBeenCalled();
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
});
