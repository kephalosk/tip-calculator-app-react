import { useMemo } from "react";
import { LabelTypeEnum } from "@/globals/constants/LabelTypeEnum.ts";
import {
  EMPTY_LABEL_TEXT,
  EMPTY_PRICE_DECIMAL_STRING,
  EMPTY_PRICE_LABEL_TEXT,
  EMPTY_PRICE_SECTION_DEVISOR_LABEL_TEXT,
  EMPTY_PRICE_SECTION_LABEL_TEXT,
  EMPTY_STRING,
  PRICE_SECTION_DEVISOR_PREFIX,
} from "@/globals/constants/constants.ts";

const useLabelType = (
  type: LabelTypeEnum,
  text: string,
): { ariaLabel: string; renderedText: string } => {
  const ariaLabel: string = useMemo((): string => {
    switch (type) {
      case LabelTypeEnum.LABEL:
        return text === EMPTY_STRING ? EMPTY_LABEL_TEXT : text;
      case LabelTypeEnum.PRICE_LABEL:
        return text === EMPTY_PRICE_DECIMAL_STRING
          ? EMPTY_PRICE_LABEL_TEXT
          : `$${text}`;
      case LabelTypeEnum.PRICE_SECTION_DIVISOR_LABEL:
        return text === EMPTY_STRING
          ? EMPTY_PRICE_SECTION_DEVISOR_LABEL_TEXT
          : `${PRICE_SECTION_DEVISOR_PREFIX} ${text}`;
      case LabelTypeEnum.PRICE_SECTION_LABEL:
        return text === EMPTY_STRING ? EMPTY_PRICE_SECTION_LABEL_TEXT : text;
      default:
        return text === EMPTY_STRING ? EMPTY_LABEL_TEXT : text;
    }
  }, [text, type]);

  const renderedText: string = useMemo((): string => {
    switch (type) {
      case LabelTypeEnum.LABEL:
        return text;
      case LabelTypeEnum.PRICE_LABEL:
        return `$${text}`;
      case LabelTypeEnum.PRICE_SECTION_DIVISOR_LABEL:
        return `${PRICE_SECTION_DEVISOR_PREFIX} ${text}`;
      case LabelTypeEnum.PRICE_SECTION_LABEL:
        return text;
      default:
        return text;
    }
  }, [text, type]);

  return { ariaLabel, renderedText };
};

export default useLabelType;
