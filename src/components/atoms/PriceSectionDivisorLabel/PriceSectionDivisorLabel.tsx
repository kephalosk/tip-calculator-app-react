import "./PriceSectionDivisorLabel.scss";
import React, { ReactElement } from "react";
import {
  EMPTY_PRICE_SECTION_DEVISOR_LABEL_TEXT,
  EMPTY_STRING,
  PRICE_SECTION_DEVISOR_PREFIX,
} from "@/globals/constants/constants.ts";
import useWarnIfEmptyText from "@/hooks/useWarnIfEmptyText.ts";

export interface PriceSectionDivisorLabelProps
  extends React.HTMLProps<HTMLLabelElement> {
  text?: string;
}

const PriceSectionDivisorLabel: React.FC<PriceSectionDivisorLabelProps> =
  React.memo(
    ({ text = EMPTY_STRING }: PriceSectionDivisorLabelProps): ReactElement => {
      useWarnIfEmptyText(text);

      return (
        <label
          className="priceSectionDivisorLabel"
          aria-label={
            text === EMPTY_STRING
              ? EMPTY_PRICE_SECTION_DEVISOR_LABEL_TEXT
              : `${PRICE_SECTION_DEVISOR_PREFIX} ${text}`
          }
        >
          {`${PRICE_SECTION_DEVISOR_PREFIX} ${text}`}
        </label>
      );
    },
  );

export default PriceSectionDivisorLabel;
