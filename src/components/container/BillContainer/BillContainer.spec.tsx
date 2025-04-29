import { render, screen, fireEvent } from "@testing-library/react";
import BillContainer from "./BillContainer";
import { BILL_INPUT_MAX_VALUE } from "@/globals/config.ts";
import {
  BILL_ICON_ALT_TEXT,
  BILL_INPUT_ID,
  BILL_INPUT_NAME,
  BILL_LABEL,
} from "@/globals/constants/constants.ts";
import Input from "@/components/atoms/Input/Input.tsx";
import React, { ReactNode } from "react";
import useBill from "@/hooks/redux/useBill.ts";
import { useBillReset } from "@/hooks/redux/useBillReset.ts";
import { DOLLAR_ICON_SRC } from "@/globals/constants/ressources.ts";
import Label from "@/components/atoms/Label/Label.tsx";
import { LabelTypeEnum } from "@/globals/constants/LabelTypeEnum.ts";

const labelTestId: string = "label";
jest.mock(
  "@/components/atoms/Label/Label.tsx",
  (): jest.Mock =>
    jest.fn(
      (props): ReactNode => <div data-testid={labelTestId}>{props.text}</div>,
    ),
);

const inputTestId: string = "input";
jest.mock(
  "@/components/atoms/Input/Input",
  (): jest.Mock =>
    jest.fn((props) => (
      <input
        data-testid={inputTestId}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          props.propagateValue(e.target.value, e)
        }
      />
    )),
);

jest.mock(
  "@/hooks/redux/useBill",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

jest.mock(
  "@/hooks/redux/useBillReset",
  (): {
    __esModule: boolean;
    useBillReset: jest.Mock;
  } => ({
    __esModule: true,
    useBillReset: jest.fn(),
  }),
);

describe("BillContainer", (): void => {
  const setup = (): { container: HTMLElement } => {
    return render(<BillContainer />);
  };

  const UpdateBillValueMock: jest.Mock = jest.fn();

  beforeEach((): void => {
    (useBill as jest.Mock).mockReturnValue({
      updateBillValue: UpdateBillValueMock,
    });
    (useBillReset as jest.Mock).mockReturnValue({
      triggerReset: false,
    });
  });

  it("renders div billContainer", (): void => {
    const { container } = setup();

    const headlineLabel: HTMLElement | null =
      container.querySelector(".billContainer");

    expect(headlineLabel).toBeInTheDocument();
  });

  it("renders the HeadlineLabel with correct text", (): void => {
    setup();

    const headlineLabel: HTMLElement = screen.getByTestId(labelTestId);
    expect(headlineLabel).toBeInTheDocument();
    expect(Label).toHaveBeenCalledTimes(1);
    expect(Label).toHaveBeenCalledWith(
      {
        type: LabelTypeEnum.HEADLINE_LABEL,
        text: BILL_LABEL,
      },
      undefined,
    );
  });

  it("renders span billContainerInput", (): void => {
    const { container } = setup();

    const headlineLabel: HTMLElement | null = container.querySelector(
      ".billContainerInput",
    );

    expect(headlineLabel).toBeInTheDocument();
  });

  it("renders the Input component with correct props", (): void => {
    render(<BillContainer />);

    const inputElement: HTMLElement = screen.getByTestId(inputTestId);

    expect(inputElement).toBeInTheDocument();
    expect(Input).toHaveBeenCalledTimes(1);
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

  it("renders the dollar icon image with correct alt text", (): void => {
    const { container } = setup();

    const imgElement: HTMLElement | null = container.querySelector(
      ".billContainerInputIcon",
    );

    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute("src", DOLLAR_ICON_SRC);
    expect(imgElement).toHaveAttribute("alt", BILL_ICON_ALT_TEXT);
    expect(imgElement).toHaveAttribute("aria-hidden", "true");
  });

  it("calls updateBillValue when input value changes", (): void => {
    render(<BillContainer />);

    const inputElement: HTMLElement = screen.getByTestId(inputTestId);
    fireEvent.change(inputElement, { target: { value: BILL_INPUT_MAX_VALUE } });

    expect(UpdateBillValueMock).toHaveBeenCalledWith(
      `${BILL_INPUT_MAX_VALUE}`,
      expect.any(Object),
    );
  });

  it("calls hook useBill", (): void => {
    setup();

    expect(useBill).toHaveBeenCalledTimes(1);
    expect(useBill).toHaveBeenCalledWith();
  });

  it("calls hook useBillReset", (): void => {
    setup();

    expect(useBillReset).toHaveBeenCalledTimes(1);
    expect(useBillReset).toHaveBeenCalledWith();
  });
});
