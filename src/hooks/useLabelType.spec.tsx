import { LabelTypeEnum } from "@/globals/constants/LabelType.ts";
import {
  EMPTY_LABEL_TEXT,
  EMPTY_PRICE_DECIMAL_STRING,
  EMPTY_PRICE_LABEL_TEXT,
  EMPTY_PRICE_SECTION_DEVISOR_LABEL_TEXT,
  EMPTY_PRICE_SECTION_LABEL_TEXT,
  EMPTY_STRING,
  PRICE_SECTION_DEVISOR_PREFIX,
} from "@/globals/constants/constants.ts";
import { ReactElement } from "react";
import useLabelType from "@/hooks/useLabelType.ts";
import { render, screen } from "@testing-library/react";

describe("useLabelType hook", (): void => {
  const type: LabelTypeEnum = LabelTypeEnum.PRICE_LABEL;
  const textDefined: string = "test";

  interface testProps {
    type: LabelTypeEnum;
    text: string;
  }

  const testId: string = "test-id";
  const setup = (
    propsOverride?: Partial<testProps>,
  ): { container: HTMLElement } => {
    const defaultProps: testProps = {
      type,
      text: textDefined,
    };

    const props: testProps = {
      ...defaultProps,
      ...propsOverride,
    };
    const TestComponent = ({ type, text }: testProps): ReactElement => {
      const { ariaLabel, renderedText } = useLabelType(type, text);
      return (
        <label data-testid={testId} aria-label={ariaLabel}>
          {renderedText}
        </label>
      );
    };

    return render(<TestComponent {...props} />);
  };

  it.each([
    [LabelTypeEnum.LABEL, textDefined],
    [LabelTypeEnum.PRICE_LABEL, `$${textDefined}`],
    [
      LabelTypeEnum.PRICE_SECTION_DIVISOR_LABEL,
      `${PRICE_SECTION_DEVISOR_PREFIX} ${textDefined}`,
    ],
    [LabelTypeEnum.PRICE_SECTION_LABEL, textDefined],
    ["undefined" as LabelTypeEnum, textDefined],
  ])(
    "returns aria-label for labelType %s for defined text",
    (type: LabelTypeEnum, ariaLabel: string): void => {
      setup({ type, text: textDefined });

      const element: HTMLElement = screen.getByTestId(testId);

      expect(element).toHaveAttribute("aria-label", ariaLabel);
    },
  );

  it.each([
    [LabelTypeEnum.LABEL, EMPTY_STRING, EMPTY_LABEL_TEXT],
    [
      LabelTypeEnum.PRICE_LABEL,
      EMPTY_PRICE_DECIMAL_STRING,
      EMPTY_PRICE_LABEL_TEXT,
    ],
    [
      LabelTypeEnum.PRICE_SECTION_DIVISOR_LABEL,
      EMPTY_STRING,
      EMPTY_PRICE_SECTION_DEVISOR_LABEL_TEXT,
    ],
    [
      LabelTypeEnum.PRICE_SECTION_LABEL,
      EMPTY_STRING,
      EMPTY_PRICE_SECTION_LABEL_TEXT,
    ],
    ["undefined" as LabelTypeEnum, EMPTY_STRING, EMPTY_LABEL_TEXT],
  ])(
    "returns default aria-label for labelType %s for empty text %s",
    (type: LabelTypeEnum, emptyText: string, defaultLabel: string): void => {
      setup({ type, text: emptyText });

      const element: HTMLElement = screen.getByTestId(testId);

      expect(element).toHaveAttribute("aria-label", defaultLabel);
    },
  );

  it.each([
    [LabelTypeEnum.LABEL, textDefined],
    [LabelTypeEnum.PRICE_LABEL, `$${textDefined}`],
    [
      LabelTypeEnum.PRICE_SECTION_DIVISOR_LABEL,
      `${PRICE_SECTION_DEVISOR_PREFIX} ${textDefined}`,
    ],
    [LabelTypeEnum.PRICE_SECTION_LABEL, textDefined],
    ["undefined" as LabelTypeEnum, textDefined],
  ])(
    "returns text to render for labelType %s",
    (type: LabelTypeEnum, renderedText: string): void => {
      setup({ type, text: textDefined });

      const element: HTMLElement = screen.getByTestId(testId);

      expect(element).toHaveTextContent(renderedText);
    },
  );
});
