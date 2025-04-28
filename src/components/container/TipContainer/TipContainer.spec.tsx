import { render, fireEvent, screen } from "@testing-library/react";
import TipContainer from "./TipContainer";
import useTipItems from "@/hooks/redux/useTipItems.ts";
import useInputValue from "@/hooks/redux/useInputValue.ts";
import { TipItem, TipItems } from "@/globals/constants/TipItems.ts";
import Input from "@/components/atoms/Input/Input.tsx";
import TipFieldLabel from "@/components/atoms/TipFieldLabel/TipFieldLabel.tsx";
import HeadlineLabel from "@/components/label/HeadlineLabel/HeadlineLabel.tsx";
import React, { ReactNode } from "react";
import {
  TIP_INPUT_ID,
  TIP_INPUT_NAME,
  TIP_INPUT_PLACEHOLDER,
  TIP_LABEL,
} from "@/globals/constants/constants.ts";
import { TIP_INPUT_MAX_VALUE } from "@/globals/config.ts";

const headlineLabelTestId: string = "headline-label";
jest.mock(
  "@/components/label/HeadlineLabel/HeadlineLabel",
  (): jest.Mock =>
    jest.fn(
      (props): ReactNode => (
        <div data-testid={headlineLabelTestId}>{props.text}</div>
      ),
    ),
);

const TipFieldLabelTestId: string = "tip-field-label";
jest.mock(
  "@/components/atoms/TipFieldLabel/TipFieldLabel",
  (): jest.Mock =>
    jest.fn(
      (props): ReactNode => (
        <div
          data-testid={TipFieldLabelTestId}
          onClick={() => props.propagateChange()}
        >
          {props.text}
        </div>
      ),
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
  "@/hooks/redux/useTipItems.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

jest.mock(
  "@/hooks/redux/useInputValue.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

jest.mock("react-redux", (): { useDispatch: jest.Mock } => ({
  useDispatch: jest.fn(),
}));

describe("TipContainer", (): void => {
  const setup = (): { container: HTMLElement } => {
    return render(<TipContainer />);
  };

  const mockTipItems: TipItem[] = TipItems;
  const handleTipItemClickMock: jest.Mock = jest.fn();
  const deactivateAllItemsMock: jest.Mock = jest.fn();
  const useTipItemsMock = {
    tipItems: mockTipItems,
    handleTipItemClick: handleTipItemClickMock,
    triggerReset: false,
    deactivateAllItems: deactivateAllItemsMock,
  };

  const handleInputChangeMock: jest.Mock = jest.fn();
  const useInputValueMock: {
    handleInputChange: jest.Mock;
  } = {
    handleInputChange: handleInputChangeMock,
  };

  beforeEach((): void => {
    (useTipItems as jest.Mock).mockReturnValue(useTipItemsMock);
    (useInputValue as jest.Mock).mockReturnValue(useInputValueMock);
  });

  it("renders div tipContainer", (): void => {
    const { container } = setup();

    const headlineLabel: HTMLElement | null =
      container.querySelector(".tipContainer");

    expect(headlineLabel).toBeInTheDocument();
  });

  it("renders component HeadlineLabel correctly", (): void => {
    setup();

    const component: HTMLElement = screen.getByTestId("headline-label");

    expect(component).toBeInTheDocument();
    expect(HeadlineLabel).toHaveBeenCalledTimes(1);
    expect(HeadlineLabel).toHaveBeenCalledWith({ text: TIP_LABEL }, undefined);
  });

  it("renders div tipContainerGrid", (): void => {
    const { container } = setup();

    const headlineLabel: HTMLElement | null =
      container.querySelector(".tipContainerGrid");

    expect(headlineLabel).toBeInTheDocument();
  });

  it("renders components TipFieldLabels correctly", (): void => {
    setup();

    const components: HTMLElement[] = screen.getAllByTestId("tip-field-label");

    expect(components).toHaveLength(TipItems.length);
    expect(TipFieldLabel).toHaveBeenCalledTimes(5);
    mockTipItems.forEach((item: TipItem, index: number): void => {
      expect(TipFieldLabel).toHaveBeenNthCalledWith(
        index + 1,
        {
          isActive: item.isActive,
          propagateChange: expect.any(Function),
          text: item.text,
        },
        undefined,
      );
    });
  });

  it("renders component Input correctly", (): void => {
    setup();

    const component: HTMLElement = screen.getByTestId("input");

    expect(component).toBeInTheDocument();
    expect(Input).toHaveBeenCalledTimes(1);
    expect(Input).toHaveBeenCalledWith(
      {
        id: TIP_INPUT_ID,
        name: TIP_INPUT_NAME,
        maxValue: TIP_INPUT_MAX_VALUE,
        propagateValue: expect.any(Function),
        placeholder: TIP_INPUT_PLACEHOLDER,
        allowDecimals: true,
        withPercentageSign: true,
        triggerReset: false,
      },
      undefined,
    );
  });

  it("calls useTipItems", (): void => {
    setup();

    expect(useTipItems).toHaveBeenCalledTimes(1);
    expect(useTipItems).toHaveBeenCalled();
  });

  it("calls useInputValue", (): void => {
    setup();

    expect(useInputValue).toHaveBeenCalledTimes(1);
    expect(useInputValue).toHaveBeenCalled();
  });

  it("calls propagateValue", (): void => {
    setup();

    const input: HTMLElement = screen.getByTestId("input");
    fireEvent.change(input, { target: { value: "42" } });

    expect(handleInputChangeMock).toHaveBeenCalledWith(0.42, expect.anything());
  });

  it("calls propagateChange", (): void => {
    render(<TipContainer />);

    const tipFields: HTMLElement[] = screen.getAllByTestId("tip-field-label");
    fireEvent.click(tipFields.at(1)!);

    expect(handleTipItemClickMock).toHaveBeenCalledWith(0.1);
  });
});
