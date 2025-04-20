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
import Input from "@/components/atoms/Input/Input.tsx";
import React, { ReactNode } from "react";

jest.mock(
  "@/components/label/HeadlineLabel/HeadlineLabel",
  (): jest.Mock =>
    jest.fn(
      (props): ReactNode => (
        <div data-testid="headline-label">{props.text}</div>
      ),
    ),
);

jest.mock(
  "@/components/atoms/Input/Input",
  (): jest.Mock =>
    jest.fn((props) => (
      <input
        data-testid="input"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          props.propagateValue(e.target.value, e)
        }
      />
    )),
);

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

  it("renders div billContainer", (): void => {
    const { container } = render(<BillContainer />);

    const headlineLabel: HTMLElement | null =
      container.querySelector(".billContainer");

    expect(headlineLabel).toBeInTheDocument();
  });

  it("renders the HeadlineLabel with correct text", (): void => {
    render(<BillContainer />);

    const headlineLabel: HTMLElement = screen.getByText(BILL_LABEL);
    expect(headlineLabel).toBeInTheDocument();
  });

  it("renders span billContainerInput", (): void => {
    const { container } = render(<BillContainer />);

    const headlineLabel: HTMLElement | null = container.querySelector(
      ".billContainerInput",
    );

    expect(headlineLabel).toBeInTheDocument();
  });

  it("renders the Input component with correct props", (): void => {
    render(<BillContainer />);

    const inputElement: HTMLElement = screen.getByRole("textbox");

    expect(inputElement).toBeInTheDocument();
    expect(Input).toHaveBeenCalledWith(
      {
        allowDecimals: true,
        id: BILL_INPUT_ID,
        maxValue: BILL_INPUT_MAX_VALUE,
        name: BILL_INPUT_NAME,
        propagateValue: expect.any(Function),
      },
      undefined,
    );
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
