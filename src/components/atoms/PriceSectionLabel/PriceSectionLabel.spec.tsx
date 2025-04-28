import PriceSectionLabel, { PriceSectionLabelProps } from "./PriceSectionLabel";
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

describe("PriceSectionDivisorLabel Component", (): void => {
  const defaultText: string = "Tip Amount";
  const defaultProps: PriceSectionLabelProps = {
    text: defaultText,
  };

  renderLabelTests(
    PriceSectionLabel,
    LabelType.PRICE_SECTION_LABEL,
    defaultText,
    defaultProps,
  );
});
