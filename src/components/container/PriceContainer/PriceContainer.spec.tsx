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
import PriceSectionLabel from "@/components/atoms/PriceSectionLabel/PriceSectionLabel.tsx";
import PriceSectionDivisorLabel from "@/components/atoms/PriceSectionDivisorLabel/PriceSectionDivisorLabel.tsx";
import PriceLabel from "@/components/atoms/PriceLabel/PriceLabel.tsx";

const priceSectionTestId: string = "price-section-label";
jest.mock(
  "@/components/atoms/PriceSectionLabel/PriceSectionLabel.tsx",
  (): jest.Mock =>
    jest.fn(
      (props): ReactNode => (
        <label data-testid={priceSectionTestId}>{props.text}</label>
      ),
    ),
);

const priceSectionDivisorTestId: string = "price-section-divisor-label";
jest.mock(
  "@/components/atoms/PriceSectionDivisorLabel/PriceSectionDivisorLabel.tsx",
  (): jest.Mock =>
    jest.fn(
      (props): ReactNode => (
        <label data-testid={priceSectionDivisorTestId}>{props.text}</label>
      ),
    ),
);

const priceTestId: string = "price-label";
jest.mock(
  "@/components/atoms/PriceLabel/PriceLabel.tsx",
  (): jest.Mock =>
    jest.fn(
      (props): ReactNode => (
        <label data-testid={priceTestId}>{props.text}</label>
      ),
    ),
);

describe("PriceContainer", (): void => {
  const priceType: string = PRICE_SECTION_LABEL_TEXT_AMOUNT;
  const priceAmount: string = "300.000";

  const setup = (options?: Partial<PriceContainerProps>): HTMLElement => {
    const { container } = render(
      <PriceContainer
        priceType={options?.priceType ?? priceType}
        priceAmount={options?.priceAmount ?? priceAmount}
      />,
    );
    return container;
  };

  it("renders div priceContainer", (): void => {
    const container: HTMLElement = setup();

    const element: HTMLElement | null =
      container.querySelector(".priceContainer");

    expect(element).toBeInTheDocument();
  });

  it("renders div priceContainerSection", (): void => {
    const container: HTMLElement = setup();

    const element: HTMLElement | null = container.querySelector(
      ".priceContainerSection",
    );

    expect(element).toBeInTheDocument();
  });

  it("renders component priceContainerSection with passed prop priceType", (): void => {
    setup({ priceType });

    const element: HTMLElement | null = screen.getByTestId(priceSectionTestId);

    expect(element).toBeInTheDocument();
    expect(PriceSectionLabel).toHaveBeenCalledWith(
      { text: priceType },
      undefined,
    );
  });

  it("renders component PriceSectionDivisorLabel with constant PRICE_SECTION_DIVISOR_TEXT", (): void => {
    setup({ priceType });

    const element: HTMLElement | null = screen.getByTestId(
      priceSectionDivisorTestId,
    );

    expect(element).toBeInTheDocument();
    expect(PriceSectionDivisorLabel).toHaveBeenCalledWith(
      { text: PRICE_SECTION_DIVISOR_TEXT },
      undefined,
    );
  });

  it("renders component PriceLabel with passed prop priceAmount", (): void => {
    setup({ priceAmount });

    const element: HTMLElement | null = screen.getByTestId(priceTestId);

    expect(element).toBeInTheDocument();
    expect(PriceLabel).toHaveBeenCalledWith({ text: priceAmount }, undefined);
  });

  it("renders component PriceLabel with default priceAmount", (): void => {
    setup({ priceAmount: "" });

    const element: HTMLElement | null = screen.getByTestId(priceTestId);

    expect(element).toBeInTheDocument();
    expect(PriceLabel).toHaveBeenCalledWith(
      { text: EMPTY_PRICE_DECIMAL_STRING },
      undefined,
    );
  });
});
