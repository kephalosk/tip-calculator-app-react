import { render, screen, fireEvent } from "@testing-library/react";
import BillContainer from "./BillContainer";
import { BILL_INPUT_MAX_VALUE } from "@/globals/config.ts";
import {
  BILL_INPUT_ID,
  BILL_INPUT_NAME,
  BILL_LABEL,
} from "@/globals/constants/constants.ts";
import Input from "@/components/atoms/Input/Input.tsx";
import React, { ReactNode } from "react";
import useBill from "@/hooks/redux/useBill.ts";
import { useBillReset } from "@/hooks/redux/useBillReset.ts";

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

jest.mock("@/hooks/redux/useBill", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("@/hooks/redux/useBillReset", () => ({
  __esModule: true,
  useBillReset: jest.fn(),
}));

describe("BillContainer", (): void => {
  const mockUpdateBillValue = jest.fn();

  beforeEach((): void => {
    (useBill as jest.Mock).mockReturnValue({
      updateBillValue: mockUpdateBillValue,
    });
    (useBillReset as jest.Mock).mockReturnValue({
      triggerReset: false,
    });
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
        triggerReset: false,
      },
      undefined,
    );
  });

  it("calls updateBillValue when input value changes", (): void => {
    render(<BillContainer />);

    const input: HTMLElement = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: BILL_INPUT_MAX_VALUE } });

    expect(mockUpdateBillValue).toHaveBeenCalledWith(
      `${BILL_INPUT_MAX_VALUE}`,
      expect.any(Object),
    );
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
});
