import PriceContainer from "@/components/container/PriceContainer/PriceContainer.tsx";
import Button from "@/components/atoms/Button/Button.tsx";
import { ReactElement } from "react";
import { useResultCalculations } from "@/hooks/useResultCalculations.ts";
import { render, screen } from "@testing-library/react";
import ResultContainer from "@/components/container/ResultContainer/ResultContainer.tsx";
import { useResetFields } from "@/hooks/redux/useResetFields.ts";
import {
  BUTTON_TEXT_RESET,
  PRICE_SECTION_LABEL_TEXT_AMOUNT,
  PRICE_SECTION_LABEL_TEXT_TOTAL,
} from "@/globals/constants/constants.ts";

const priceContainerTestId: string = "price-container";
jest.mock(
  "@/components/container/PriceContainer/PriceContainer.tsx",
  (): jest.Mock =>
    jest.fn((): ReactElement => {
      return <div data-testid={priceContainerTestId}></div>;
    }),
);

const buttonTestId: string = "button";
jest.mock(
  "@/components/atoms/Button/Button.tsx",
  (): jest.Mock =>
    jest.fn((): ReactElement => {
      return <div data-testid={buttonTestId}></div>;
    }),
);

jest.mock(
  "@/hooks/useResultCalculations.ts",
  (): {
    __esModule: boolean;
    useResultCalculations: jest.Mock;
  } => ({
    __esModule: true,
    useResultCalculations: jest.fn(),
  }),
);

jest.mock(
  "@/hooks/redux/useResetFields.ts",
  (): {
    __esModule: boolean;
    useResetFields: jest.Mock;
  } => ({
    __esModule: true,
    useResetFields: jest.fn(),
  }),
);

describe("ResultContainer", (): void => {
  const setup = (): { container: HTMLElement } => {
    const { container } = render(<ResultContainer />);
    return { container };
  };

  const tipTotal: string = "10.00";
  const totalSum: string = "110.00";
  const resetAllFieldsMock: jest.Mock = jest.fn();

  beforeEach((): void => {
    (useResultCalculations as jest.Mock).mockReturnValue({
      tipTotal,
      totalSum,
    });
    (useResetFields as jest.Mock).mockReturnValue(resetAllFieldsMock);
  });

  it("renders div resultContainer", (): void => {
    const { container } = setup();

    const element: HTMLElement | null =
      container.querySelector(".resultContainer");

    expect(element).toBeInTheDocument();
  });

  it("renders component PriceContainer for tipTotal", (): void => {
    setup();

    const elements: HTMLElement[] = screen.getAllByTestId(priceContainerTestId);

    expect(elements).toHaveLength(2);
    expect(PriceContainer).toHaveBeenNthCalledWith(
      1,
      { priceAmount: tipTotal, priceType: PRICE_SECTION_LABEL_TEXT_AMOUNT },
      undefined,
    );
  });

  it("renders div resultContainerSpace", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(
      ".resultContainerSpace",
    );

    expect(element).toBeInTheDocument();
  });

  it("renders component PriceContainer for totalSum", (): void => {
    setup();

    const elements: HTMLElement[] = screen.getAllByTestId(priceContainerTestId);

    expect(elements).toHaveLength(2);
    expect(PriceContainer).toHaveBeenNthCalledWith(
      2,
      { priceAmount: totalSum, priceType: PRICE_SECTION_LABEL_TEXT_TOTAL },
      undefined,
    );
  });

  it("renders component Button to reset AllFields", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(buttonTestId);

    expect(element).toBeInTheDocument();
    expect(Button).toHaveBeenCalledWith(
      {
        handleButtonClick: resetAllFieldsMock,
        isDisabled: false,
        text: BUTTON_TEXT_RESET,
      },
      undefined,
    );
  });
});
