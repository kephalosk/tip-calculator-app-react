import { render, screen, fireEvent } from "@testing-library/react";
import BillContainer from "./BillContainer";
import { useDispatch } from "react-redux";
import { setBillValue } from "@/redux/slices/billSlice.ts";
import { BILL_INPUT_MAX_VALUE } from "@/globals/config.ts";
import {
  BILL_INPUT_ID,
  BILL_INPUT_NAME,
  BILL_LABEL,
} from "@/globals/constants/constants.ts";
import { InputProps } from "@/components/atoms/Input/Input.tsx";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

jest.mock("@/redux/slices/billSlice.ts", () => ({
  setBillValue: jest.fn(),
}));

describe("BillContainer", (): void => {
  const dispatch: jest.Mock = jest.fn();

  beforeEach((): void => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatch);
  });

  it("renders the HeadlineLabel with correct text", (): void => {
    render(<BillContainer />);

    const headlineLabel: HTMLElement = screen.getByText(BILL_LABEL);
    expect(headlineLabel).toBeInTheDocument();
  });

  it("renders the Input component with correct props", (): void => {
    const inputProps: InputProps = {
      allowDecimals: true,
      id: BILL_INPUT_ID,
      name: BILL_INPUT_NAME,
      maxValue: BILL_INPUT_MAX_VALUE,
      propagateValue: expect.any(Function),
    };

    render(<BillContainer />);

    const inputElement: HTMLElement = screen.getByRole("textbox");
    expect(inputElement).toHaveAttribute("id", inputProps.id);
    expect(inputElement).toHaveAttribute("name", inputProps.name);
  });

  it("calls updateBillValue when input value changes", (): void => {
    render(<BillContainer />);

    const input: HTMLElement = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: BILL_INPUT_MAX_VALUE } });

    expect(dispatch).toHaveBeenCalledWith(setBillValue(BILL_INPUT_MAX_VALUE));
  });

  it("renders the dollar icon image with correct alt text", (): void => {
    render(<BillContainer />);

    const imgElement: HTMLElement = screen.getByAltText(
      "Dollar Icon for Input Field",
    );
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute(
      "src",
      "src/assets/images/icon-dollar.svg",
    );
  });

  it("does not call updateBillValue with invalid input", (): void => {
    render(<BillContainer />);

    const input: HTMLElement = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: -1 } });

    expect(dispatch).not.toHaveBeenCalled();
  });
});
