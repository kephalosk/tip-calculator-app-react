import { render, fireEvent, screen } from "@testing-library/react";
import TipContainer from "./TipContainer";
import { useTipItems } from "@/hooks/useTipItems";
import { useInputValue } from "@/hooks/useInputValue";
import { useDispatch } from "react-redux";
import { TipItem, TipItems } from "@/globals/constants/TipItems.ts";
import Input from "@/components/atoms/Input/Input.tsx";
import TipFieldLabel from "@/components/atoms/TipFieldLabel/TipFieldLabel.tsx";
import HeadlineLabel from "@/components/label/HeadlineLabel/HeadlineLabel.tsx";
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
  "@/components/atoms/TipFieldLabel/TipFieldLabel",
  (): jest.Mock =>
    jest.fn(
      (props): ReactNode => (
        <div
          data-testid="tip-field-label"
          onClick={() => props.propagateChange()}
        >
          {props.text}
        </div>
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

jest.mock("@/hooks/useTipItems", (): { useTipItems: jest.Mock } => ({
  useTipItems: jest.fn(),
}));

jest.mock("@/hooks/useInputValue", (): { useInputValue: jest.Mock } => ({
  useInputValue: jest.fn(),
}));

jest.mock("react-redux", (): { useDispatch: jest.Mock } => ({
  useDispatch: jest.fn(),
}));

describe("TipContainer", (): void => {
  const dispatch: jest.Mock = jest.fn();
  const mockHandleTipItemClick: jest.Mock = jest.fn();
  const mockHandleInputChange: jest.Mock = jest.fn();
  const mockDeactivateAllItems: jest.Mock = jest.fn();

  const mockTipItems: TipItem[] = TipItems;

  beforeEach((): void => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatch);
    (useTipItems as jest.Mock).mockReturnValue({
      tipItems: mockTipItems,
      handleTipItemClick: mockHandleTipItemClick,
      triggerReset: false,
      deactivateAllItems: mockDeactivateAllItems,
    });
    (useInputValue as jest.Mock).mockReturnValue({
      handleInputChange: mockHandleInputChange,
    });
  });

  it("renders component HeadlineLabel correctly", (): void => {
    render(<TipContainer />);

    const component: HTMLElement = screen.getByTestId("headline-label");

    expect(component).toBeInTheDocument();
    expect(HeadlineLabel).toHaveBeenCalled();
  });

  it("renders components TipFieldLabels correctly", (): void => {
    render(<TipContainer />);

    const components: HTMLElement[] = screen.getAllByTestId("tip-field-label");

    expect(components).toHaveLength(TipItems.length);
    expect(TipFieldLabel).toHaveBeenCalledTimes(5);
  });

  it("renders component TipContainer correctly", (): void => {
    render(<TipContainer />);

    const component: HTMLElement = screen.getByTestId("input");

    expect(component).toBeInTheDocument();
    expect(Input).toHaveBeenCalled();
  });

  it("calls useTipItems", (): void => {
    render(<TipContainer />);

    expect(useTipItems).toHaveBeenCalled();
  });

  it("calls useInputValue", (): void => {
    render(<TipContainer />);

    expect(useInputValue).toHaveBeenCalled();
  });

  it("calls propagateValue", (): void => {
    render(<TipContainer />);

    const input: HTMLElement = screen.getByTestId("input");
    fireEvent.change(input, { target: { value: "42" } });

    expect(mockHandleInputChange).toHaveBeenCalledWith(0.42, expect.anything());
  });

  it("calls propagateChange", (): void => {
    render(<TipContainer />);

    const tipFields: HTMLElement[] = screen.getAllByTestId("tip-field-label");
    fireEvent.click(tipFields.at(1)!);

    expect(mockHandleTipItemClick).toHaveBeenCalledWith(0.1);
  });
});
