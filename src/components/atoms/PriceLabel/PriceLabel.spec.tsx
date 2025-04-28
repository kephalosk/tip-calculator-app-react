import PriceLabel, { PriceLabelProps } from "./PriceLabel";
import renderLabelTests, { LabelType } from "@/jest/renderLabelTests.tsx";

jest.mock(
  "@/hooks/useWarnIfEmptyText",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

describe("PriceLabel Component", (): void => {
  const defaultText: string = "1.00";
  const defaultProps: PriceLabelProps = {
    text: defaultText,
  };

  renderLabelTests(
    PriceLabel,
    LabelType.PRICE_LABEL,
    defaultText,
    defaultProps,
  );
});
