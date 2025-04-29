import { render, screen } from "@testing-library/react";
import { ReactNode } from "react";
import {
  EMPTY_PRICE_DECIMAL_STRING,
  PRICE_SECTION_DIVISOR_TEXT,
  PRICE_SECTION_LABEL_TEXT_AMOUNT,
} from "@/globals/constants/constants.ts";
import PriceContainer, {
  PriceContainerProps,
} from "@/components/container/PriceContainer/PriceContainer.tsx";
import Label from "@/components/atoms/Label/Label.tsx";
import { LabelTypeEnum } from "@/globals/constants/LabelTypeEnum.ts";

jest.mock(
  "@/components/atoms/Label/Label.tsx",
  (): jest.Mock =>
    jest.fn(
      (props): ReactNode => <label className={props.type}>{props.text}</label>,
    ),
);

describe("PriceContainer", (): void => {
  const priceType: string = PRICE_SECTION_LABEL_TEXT_AMOUNT;
  const priceAmount: string = "300.000";

  const setup = (
    propsOverride?: Partial<PriceContainerProps>,
  ): { container: HTMLElement } => {
    const defaultProps: PriceContainerProps = {
      priceType,
      priceAmount,
    };

    const props: PriceContainerProps = { ...defaultProps, ...propsOverride };
    return render(<PriceContainer {...props} />);
  };

  it("renders div priceContainer", (): void => {
    const { container } = setup();

    const element: HTMLElement | null =
      container.querySelector(".priceContainer");

    expect(element).toBeInTheDocument();
  });

  it("renders div priceContainerSection", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(
      ".priceContainerSection",
    );

    expect(element).toBeInTheDocument();
  });

  it("renders component Label of type PRICE_SECTION_LABEL with passed prop priceType", (): void => {
    setup({ priceType });

    const element: HTMLElement | null = screen.getByText(priceType);

    expect(element).toBeInTheDocument();
    expect(Label).toHaveBeenCalledTimes(3);
    expect(Label).toHaveBeenCalledWith(
      { type: LabelTypeEnum.PRICE_SECTION_LABEL, text: priceType },
      undefined,
    );
  });

  it("renders component Label of type PRICE_SECTION_DIVISOR_LABEL with correct text", (): void => {
    setup();

    const element: HTMLElement | null = screen.getByText(
      PRICE_SECTION_DIVISOR_TEXT,
    );

    expect(element).toBeInTheDocument();
    expect(Label).toHaveBeenCalledTimes(3);
    expect(Label).toHaveBeenCalledWith(
      {
        type: LabelTypeEnum.PRICE_SECTION_DIVISOR_LABEL,
        text: PRICE_SECTION_DIVISOR_TEXT,
      },
      undefined,
    );
  });

  it("renders component Label of type PRICE_LABEL with passed prop priceAmount", (): void => {
    setup();

    const element: HTMLElement | null = screen.getByText(priceAmount);

    expect(element).toBeInTheDocument();
    expect(Label).toHaveBeenCalledTimes(3);
    expect(Label).toHaveBeenCalledWith(
      {
        type: LabelTypeEnum.PRICE_LABEL,
        text: priceAmount,
      },
      undefined,
    );
  });

  it("renders component Label with default priceAmount", (): void => {
    setup({ priceAmount: "" });

    const element: HTMLElement | null = screen.getByText(
      EMPTY_PRICE_DECIMAL_STRING,
    );

    expect(element).toBeInTheDocument();
    expect(Label).toHaveBeenCalledTimes(3);
    expect(Label).toHaveBeenCalledWith(
      {
        type: LabelTypeEnum.PRICE_LABEL,
        text: EMPTY_PRICE_DECIMAL_STRING,
      },
      undefined,
    );
  });
});
