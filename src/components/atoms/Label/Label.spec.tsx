import Label, { LabelProps } from "./Label";
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

describe("Label Component", (): void => {
  const defaultText: string = "Test Label Text";
  const defaultProps: LabelProps = {
    text: defaultText,
  };

  renderLabelTests(Label, LabelType.LABEL, defaultText, defaultProps);
});
