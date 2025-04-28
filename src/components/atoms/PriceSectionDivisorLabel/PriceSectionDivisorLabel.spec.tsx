import { PriceSectionDivisorLabelProps } from "./PriceSectionDivisorLabel";
import renderLabelTests, { LabelType } from "@/jest/renderLabelTests.tsx";
import PriceSectionDivisorLabel from "@/components/atoms/PriceSectionDivisorLabel/PriceSectionDivisorLabel.tsx";

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

describe("PriceSectionDivisorLabel Component", (): void => {
  const defaultText: string = "person";
  const defaultProps: PriceSectionDivisorLabelProps = {
    text: defaultText,
  };

  renderLabelTests(
    PriceSectionDivisorLabel,
    LabelType.PRICE_SECTION_DIVISOR_LABEL,
    defaultText,
    defaultProps,
  );
});
