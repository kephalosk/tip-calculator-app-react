import { render } from "@testing-library/react";
import useWarnIfEmptyText from "@/hooks/useWarnIfEmptyText.ts";
import {
  EMPTY_STRING,
  EMPTY_LABEL_TEXT,
  EMPTY_PRICE_DECIMAL_STRING,
  EMPTY_PRICE_LABEL_TEXT,
} from "@/globals/constants/constants.ts";
import React from "react";
import { LabelProps } from "@/components/atoms/Label/Label.tsx";
import { PriceLabelProps } from "@/components/atoms/PriceLabel/PriceLabel.tsx";

export enum LabelType {
  LABEL = "label",
  PRICE_LABEL = "priceLabel",
}

const renderLabelTests = (
  Component: React.ElementType,
  labelType: LabelType,
  text: string,
  defaultProps: LabelProps | PriceLabelProps,
): void => {
  const setup = (propsOverride?: Partial<LabelProps | PriceLabelProps>) => {
    const props: LabelProps | PriceLabelProps = {
      ...defaultProps,
      ...propsOverride,
    };
    return render(<Component {...props} />);
  };

  beforeEach(() => {
    (useWarnIfEmptyText as jest.Mock).mockReturnValue(undefined);
  });

  it("renders the label with passed prop text", (): void => {
    const expectedText: string = getExpectedText(labelType, text);
    const { container } = setup({ text });

    const element: HTMLElement | null = container.querySelector(
      `.${labelType}`,
    );

    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent(expectedText);
    expect(element).toHaveAttribute("aria-label", expectedText);
  });

  it("renders the label with default value if prop text is undefined", (): void => {
    const expectedText: string = getExpectedDefaultText(labelType);
    const expectedAriaLabel: string = getExpectedDefaultAriaLabel(labelType);
    const { container } = setup({ text: undefined });

    const element: HTMLElement | null = container.querySelector(
      `.${labelType}`,
    );

    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent(expectedText);
    expect(element).toHaveAttribute("aria-label", expectedAriaLabel);
  });

  it("calls hook useWarnIfEmptyText", (): void => {
    setup();

    expect(useWarnIfEmptyText).toHaveBeenCalledTimes(1);
    expect(useWarnIfEmptyText).toHaveBeenCalledWith(text);
  });
};

function getExpectedText(labelType: LabelType, text: string): string {
  switch (labelType) {
    case LabelType.LABEL:
      return text;
    case LabelType.PRICE_LABEL:
      return `$${text}`;
  }
}

function getExpectedDefaultText(labelType: LabelType): string {
  switch (labelType) {
    case LabelType.LABEL:
      return EMPTY_STRING;
    case LabelType.PRICE_LABEL:
      return `$${EMPTY_PRICE_DECIMAL_STRING}`;
  }
}

function getExpectedDefaultAriaLabel(labelType: LabelType): string {
  switch (labelType) {
    case LabelType.LABEL:
      return EMPTY_LABEL_TEXT;
    case LabelType.PRICE_LABEL:
      return EMPTY_PRICE_LABEL_TEXT;
  }
}

export default renderLabelTests;
